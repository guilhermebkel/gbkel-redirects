import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { describe, expect, it } from "vitest";

const GTM_SOURCE = readFileSync(new URL("../static/js/gtm.js", import.meta.url), "utf8");

const runGtm = ({ hostname, search = "" }) => {
  const inserted = [];
  const firstScript = { parentNode: { insertBefore: (script) => inserted.push(script) } };
  const window = { location: { hostname, search } };
  const document = {
    getElementsByTagName: () => [firstScript],
    createElement: () => ({}),
  };

  runInNewContext(GTM_SOURCE, { window, document });

  return { inserted, dataLayer: window.dataLayer };
};

describe("static/js/gtm.js", () => {
  it.each(["guilherr.me", "uno.guilherr.me", "pebo.guilherr.me", "192.168.0.10"])("loads GTM on %s", (hostname) => {
    const { inserted, dataLayer } = runGtm({ hostname });

    expect(inserted).toHaveLength(1);
    expect(inserted[0].src).toBe("https://www.googletagmanager.com/gtm.js?id=GTM-W4RVNG3");
    expect(dataLayer).toHaveLength(1);
  });

  it.each(["localhost", "127.0.0.1", "[::1]", "::1", "app.localhost", "mac.local"])("does not load GTM on %s", (hostname) => {
    const { inserted, dataLayer } = runGtm({ hostname });

    expect(inserted).toHaveLength(0);
    expect(dataLayer).toBeUndefined();
  });

  it.each(["?gtm_debug", "?a=1&gtm_debug=1"])("loads GTM on localhost with %s", (search) => {
    const { inserted } = runGtm({ hostname: "localhost", search });

    expect(inserted).toHaveLength(1);
  });

  it("does not treat a similar query name as the override", () => {
    const { inserted } = runGtm({ hostname: "localhost", search: "?gtm_debugger=1" });

    expect(inserted).toHaveLength(0);
  });
});
