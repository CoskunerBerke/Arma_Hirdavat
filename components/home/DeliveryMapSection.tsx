import { ShieldCheck, Truck } from "lucide-react";
import RfqTriggerButton from "@/components/RfqTriggerButton";
import { PROMISES } from "@/data/company";
import { getTurkeyMap, provinceKey, type MapProvince } from "@/lib/turkeyMap";
import CountUp from "./CountUp";
import DeliveryMapFrame from "./DeliveryMapFrame";

/*
 * (Ana sayfada GÖSTERİLMİYOR — işletme kararı, dosya duruyor.) Türkiye il haritası (sunucuda satır içi SVG), id="teslimat".
 * - İller Samsun'dan uzaklık sırasına göre tek tek yanar (kademeli CSS animasyonu, sürekli döngü; 81 ilin hepsi yanar).
 * - Samsun'dan dönen bir il kümesine kavisli sevkiyat çizgileri çizilir (stroke-dashoffset).
 * - Yalnızca opacity / stroke-dashoffset (ve halka için transform) canlandırılır; anahtar kareler app/globals.css'te.
 * - Süre/teslim sözü YAZILMAZ: metin PROMISES.delivery'dir.
 * Harita verisi: turkey-map-react (MIT) — lisans notu lib/turkeyMap.ts içinde.
 */

const HUB_KEY = "samsun";
/** Sevkiyat çizgilerinin sırayla gittiği iller (dönen küme) */
const ROUTE_TARGETS = [
  "istanbul", "izmir", "antalya", "van", "ankara", "gaziantep", "edirne", "erzurum",
  "adana", "mugla", "diyarbakir", "bursa", "kars", "konya", "hatay", "trabzon",
];
const ROUTE_STEP_S = 1.1;
const WAVE_CYCLE_S = 16;
const WAVE_SPREAD_S = 8;

/** Samsun'dan hedefe yukarı doğru kavisli ikinci derece Bézier yolu */
function curve(from: MapProvince, to: MapProvince): string {
  const dx = to.cx - from.cx;
  const dy = to.cy - from.cy;
  const len = Math.hypot(dx, dy) || 1;
  let nx = -dy / len;
  let ny = dx / len;
  if (ny > 0) {
    nx = -nx;
    ny = -ny;
  }
  const bend = len * 0.28;
  const qx = Math.round((from.cx + to.cx) / 2 + nx * bend);
  const qy = Math.round((from.cy + to.cy) / 2 + ny * bend);
  return `M${from.cx} ${from.cy}Q${qx} ${qy} ${to.cx} ${to.cy}`;
}

export default function DeliveryMapSection() {
  const { provinces, viewBox } = getTurkeyMap();
  const hub = provinces.find((p) => provinceKey(p.id) === HUB_KEY || provinceKey(p.name) === HUB_KEY);

  // Yanma sırası: Samsun'a uzaklık (dalga Samsun'dan dışa yayılır)
  const order = new Map<string, number>();
  if (hub) {
    [...provinces]
      .filter((p) => p !== hub)
      .sort((a, b) => Math.hypot(a.cx - hub.cx, a.cy - hub.cy) - Math.hypot(b.cx - hub.cx, b.cy - hub.cy))
      .forEach((p, i, arr) => order.set(p.id, (i / Math.max(1, arr.length - 1)) * WAVE_SPREAD_S));
  }

  const byKey = new Map(provinces.map((p) => [provinceKey(p.name), p] as const));
  const routes = hub
    ? ROUTE_TARGETS.map((k) => byKey.get(k)).filter((p): p is MapProvince => !!p && p !== hub)
    : [];
  const routeCycle = routes.length * ROUTE_STEP_S;

  const vb = `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`;
  const pct = (v: number, start: number, size: number) => `${(((v - start) / size) * 100).toFixed(2)}%`;

  return (
    <section id="teslimat" aria-labelledby="teslimat-baslik" className="relative isolate overflow-hidden bg-white py-14 sm:py-20">
      <div className="container-x grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Harita (~%60) */}
        <figure className="min-w-0 lg:col-span-7">
          <div className="rounded-2xl bg-navy p-3 pt-14 shadow-xl shadow-navy/20 ring-1 ring-navy-light/40 sm:p-6 sm:pt-16">
            <DeliveryMapFrame hint="Bir ilin üzerine gelin veya dokunun">
              <div className="relative" style={{ aspectRatio: `${viewBox.w} / ${viewBox.h}` }}>
                <svg
                  viewBox={vb}
                  className="absolute inset-0 h-full w-full overflow-visible"
                  role="img"
                  aria-labelledby="teslimat-harita-baslik"
                >
                  <title id="teslimat-harita-baslik">
                    Türkiye il haritası: Samsun Tekkeköy deposundan Türkiye geneline sevkiyat
                  </title>
                  <g>
                    {provinces.map((p) => {
                      const isHub = p === hub;
                      return (
                        <path
                          key={p.id}
                          d={p.d}
                          data-il={p.name}
                          className={isHub ? "map-province map-province--hub" : "map-province"}
                          style={isHub ? undefined : { animationDelay: `${(order.get(p.id) ?? 0).toFixed(2)}s` }}
                        >
                          <title>{p.name}</title>
                        </path>
                      );
                    })}
                  </g>

                  {hub && (
                    <g aria-hidden="true">
                      {routes.map((t, i) => (
                        <path
                          key={`r-${t.id}`}
                          d={curve(hub, t)}
                          pathLength={1}
                          className="map-route"
                          style={{ animationDelay: `${(i * ROUTE_STEP_S).toFixed(2)}s`, animationDuration: `${routeCycle}s` }}
                        />
                      ))}
                      {routes.map((t, i) => (
                        <circle
                          key={`d-${t.id}`}
                          cx={t.cx}
                          cy={t.cy}
                          r={6}
                          className="map-route-dot"
                          style={{ animationDelay: `${(i * ROUTE_STEP_S).toFixed(2)}s`, animationDuration: `${routeCycle}s` }}
                        />
                      ))}
                      <circle cx={hub.cx} cy={hub.cy} r={9} className="map-hub-ring" />
                      <circle cx={hub.cx} cy={hub.cy} r={9} className="map-hub-ring" style={{ animationDelay: "1.2s" }} />
                      <circle cx={hub.cx} cy={hub.cy} r={7} className="map-hub-dot" />
                    </g>
                  )}
                </svg>

                {hub && (
                  <span
                    className="pointer-events-none absolute z-10 whitespace-nowrap rounded-md bg-accent px-2.5 py-1 text-xs font-bold text-navy shadow-lg shadow-black/30 sm:text-sm"
                    style={{
                      left: `clamp(6.5rem, ${pct(hub.cx, viewBox.x, viewBox.w)}, calc(100% - 6.5rem))`,
                      top: pct(hub.cy, viewBox.y, viewBox.h),
                      transform: "translate(-50%, calc(-100% - 14px))",
                    }}
                  >
                    Merkez depo: Tekkeköy / Samsun
                    <span
                      aria-hidden
                      className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-x-[6px] border-t-[6px] border-x-transparent border-t-accent"
                    />
                  </span>
                )}
              </div>
            </DeliveryMapFrame>
          </div>
          <figcaption className="mt-2 text-xs text-ink-muted">
            Harita verisi:{" "}
            <a
              href="https://github.com/erdigokce/turkey-map-react/blob/master/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[24px] items-center underline underline-offset-2 hover:text-ink"
            >
              turkey-map-react © 2020 Erdi Gökçe (MIT lisansı)
              <span className="sr-only"> (yeni sekmede açılır)</span>
            </a>
          </figcaption>
        </figure>

        {/* Metin */}
        <div className="min-w-0 lg:col-span-5">
          <p className="eyebrow text-accent-ink">Sevkiyat</p>
          <h2 id="teslimat-baslik" className="mt-2 text-2xl font-extrabold leading-tight tracking-tight text-navy sm:text-4xl">
            Türkiye&apos;nin dört bir yanına teslimat
          </h2>
          <span aria-hidden className="mt-4 block h-1 w-16 rounded-full bg-accent" />

          <div className="mt-6 flex items-center gap-4 rounded-xl border border-line bg-canvas p-4">
            <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-navy text-accent">
              <Truck className="h-7 w-7" aria-hidden />
            </span>
            <p className="leading-tight">
              <CountUp value={81} className="text-4xl font-extrabold tracking-tight text-navy" />
              <span className="ml-1.5 text-xl font-bold text-navy">il</span>
              <span className="mt-1 block text-sm text-ink-soft">{PROMISES.deliveryShort}</span>
            </p>
          </div>

          <p className="mt-5 text-base leading-relaxed text-ink-soft">{PROMISES.delivery}</p>

          <div className="mt-6">
            <RfqTriggerButton
              source="teslimat-haritasi"
              aria-describedby="teslimat-guvence"
              className="btn-action min-h-[48px] w-full px-6 sm:w-auto"
            />
            <p id="teslimat-guvence" className="mt-2 flex items-center gap-1.5 text-xs text-ink-muted sm:text-sm">
              <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-action" aria-hidden />
              {PROMISES.quoteReassurance}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
