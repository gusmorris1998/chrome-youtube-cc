// IS THIS CORRECT?

(function(g) {
    var window = this;
    'use strict';
    var Y_Y = function(p, C, V) {
        g.I(function(N) {
            p.C = g.qU(C, V);
            g.JQ(N)
        })
    }
      , iJ = function(p) {
        p.isActive() || p.start()
    }
      , zQr = function(p, C) {
        return C ? p.captionsInitialState : "CAPTIONS_INITIAL_STATE_UNKNOWN"
    }
      , RQy = function(p) {
        return g.wG(p) || p.G("web_enable_caption_language_preference_stickiness")
    }
      , n58 = function(p, C) {
        var V = new g.is;
        V.languageCode = p.languageCode;
        V.languageName = p.languageName;
        V.name = p.name;
        V.displayName = p.displayName;
        V.kind = p.kind;
        V.isDefault = !1;
        V.T = p.T;
        V.isTranslateable = p.isTranslateable;
        V.vssId = p.vssId;
        V.url = p.url;
        V.translationLanguage = C;
        p.xtags && (V.xtags = p.xtags);
        p.captionId && (V.captionId = p.captionId);
        return V
    }
      , eQ8 = function(p, C) {
        var V, N, H;
        return g.I(function(X) {
            if (X.C == 1)
                return V = p + "|" + C,
                g.y(X, g.Vt(), 2);
            if (X.C != 3) {
                N = X.T;
                if (!N)
                    throw g.Z1("gct");
                return g.y(X, g.Zb(N), 3)
            }
            H = X.T;
            return X.return(H.get("captions", V))
        })
    }
      , PcY = function(p, C, V) {
        eQ8(p, C).then(function(N) {
            N && V(N.trackData, new g.is(N.metadata))
        })
    }
      , L9P = function(p) {
        if (!wGv.test(p))
            throw Error("'" + p + "' is not a valid hex color");
        p.length == 4 && (p = p.replace($$2, "#$1$1$2$2$3$3"));
        p = p.toLowerCase();
        p = parseInt(p.slice(1), 16);
        return [p >> 16, p >> 8 & 255, p & 255]
    }
      , g5G = function() {
        var p = void 0;
        p = p === void 0 ? {} : p;
        var C = "suggest_correction"in g.Cg0 ? g.Cg0.suggest_correction : "Edit caption";
        C = C || "";
        var V = {}, N;
        for (N in p) {
            V = {
                OS: V.OS
            };
            V.OS = N;
            var H = function(X) {
                return function() {
                    return String(p[X.OS])
                }
            }(V);
            C = C.replace(new RegExp("\\$\\{" + V.OS + "\\}","gi"), H);
            C = C.replace(new RegExp("\\$" + V.OS,"gi"), H)
        }
        return C
    }
      , W95 = function() {
        return g.zW("yt-player-caption-display-settings")
    }
      , hs = function() {
        this.segments = []
    }
      , QaP = function(p, C) {
        var V = g.Xv(p.segments, C);
        V >= 0 || V < 0 && (-V - 1) % 2 === 1 || (V = -V - 1,
        V > 0 && C - p.segments[V - 1] === 1 && V < p.segments.length && p.segments[V] - C === 1 ? (g.Q8(p.segments, V),
        g.Q8(p.segments, V - 1)) : V > 0 && C - p.segments[V - 1] === 1 ? p.segments[V - 1] = C : V < p.segments.length && p.segments[V] - C === 1 ? p.segments[V] = C : (g.VR(p.segments, V, 0, C),
        g.VR(p.segments, V + 1, 0, C)))
    }
      , r9r = function(p, C, V, N, H, X) {
        g.Y.call(this);
        this.policy = p;
        this.player = C;
        this.a$ = V;
        this.J = N;
        this.W = H;
        this.Z = X;
        this.S = new hs;
        this.Y = -1;
        this.V = this.C = this.T = null;
        this.b_ = 0;
        this.D = new g.N8(this.Nj,1E3,this);
        this.events = new g.Rr(this);
        g.R(this, this.D);
        g.R(this, this.events);
        this.events.U(C, "SEEK_COMPLETE", this.M$);
        this.M$();
        this.Nj()
    }
      , BI8 = function(p) {
        return p.T && p.T.zM ? p.T.zM + p.player.yZ() < p.player.getCurrentTime() : !1
    }
      , Ghc = function(p, C) {
        if (p.policy.Uh && p.player.Ib()) {
            var V = g.YE(C, p.policy, {});
            V.set("pot", p.player.Ib());
            V = V.i9()
        } else
            V = g.YE(C, p.policy, {}).i9();
        var N = {
            format: "RAW",
            withCredentials: !0
        };
        if (p.policy.vr) {
            N.method = "POST";
            var H = C.S;
            H && Object.keys(H).length > 0 ? N.postBody = g.l8(H, g.rr) : N.postBody = (0,
            g.Jt)([120, 0])
        }
        p.W && (N.responseType = "arraybuffer");
        var X = ++p.b_
          , d = (0,
        g.Ip)();
        p.V = g.oK(V, N, 3, 100).then(function(a) {
            if (p.policy.zy && X % 100 === 1) {
                var E = (0,
                g.Ip)();
                p.player.k_("caprsp", {
                    rn: X,
                    ms: E - d,
                    kb: (a.xhr.responseText.length / 1024).toFixed()
                })
            }
            a: {
                a = a.xhr;
                p.fS();
                if (p.C) {
                    var l = !(p.W ? a.response : a.responseText) || a.status >= 400;
                    if (E = g.Zry(a)) {
                        a = g.YE(p.C, p.policy, {});
                        p.C.x9(a, E);
                        Ghc(p, p.C);
                        break a
                    }
                    l ? p.player.k_("capfail", {
                        status: a.status
                    }) : (p.player.W6().Cd("fcb_r"),
                    E = p.C.wV[0].LS,
                    p.J != null && p.Y !== E && (l = p.C.wV[0],
                    p.W ? p.J(a.response, (l.startTime + p.player.yZ()) * 1E3) : p.J(a.responseText, (l.startTime + p.player.yZ()) * 1E3),
                    p.Y = E))
                }
                p.C = null;
                p.V = null
            }
        }).Rz(function(a) {
            p.C = null;
            p.V = null;
            var E;
            p.player.k_("capfail", {
                rn: X,
                status: (E = a.xhr) == null ? void 0 : E.status
            })
        });
        p.C = C;
        QaP(p.S, p.C.wV[0].LS)
    }
      , sb = function(p, C) {
        g.Ar.call(this, C);
        this.C = p;
        this.N = C;
        this.V = null;
        this.Y = !1;
        this.D = g.qz(this.N.K()) && !this.C.isManifestless
    }
      , CKy = function(p, C) {
        var V = [], N;
        for (N in p.C.T)
            if (p.C.T.hasOwnProperty(N)) {
                var H = p.C.T[N];
                if (g.kW(H, C || null)) {
                    var X = H.info.id
                      , d = X
                      , a = "." + X
                      , E = ""
                      , l = "";
                    if (H = H.info.captionTrack)
                        X = H.languageCode,
                        d = H.displayName,
                        a = H.vssId,
                        E = H.kind,
                        l = H.id;
                    else {
                        H = X;
                        var t = g.vV2.get(H);
                        t == null && (t = pey[H] || pey[H.replace(/-/g, "_")],
                        g.vV2.set(H, t));
                        H = t;
                        d = H || d
                    }
                    V.push(new g.is({
                        id: N,
                        languageCode: X,
                        languageName: d,
                        is_servable: !0,
                        is_default: !0,
                        is_translateable: !1,
                        vss_id: a,
                        kind: E,
                        captionId: l
                    }))
                }
            }
        return V
    }
      , jN8 = function(p, C) {
        return C != null && C in p.C.T ? p.C.T[C] : null
    }
      , Vup = function(p, C, V) {
        var N = [], H;
        for (H in p.C.T)
            if (p.C.T.hasOwnProperty(H)) {
                var X = p.C.T[H];
                if (g.kW(X, V || null)) {
                    var d = X.info.captionTrack;
                    d && d.languageCode === C && N.push(X)
                }
            }
        return N.length ? N[0] : null
    }
      , an = function(p, C, V, N, H, X, d, a, E, l) {
        var t = l.isInline() && !0
          , c = {};
        Object.assign(c, C);
        Object.assign(c, p.params);
        Object.assign(c, V);
        var T = {};
        Object.assign(T, C.yL);
        p.params.yL && Object.assign(T, p.params.yL);
        Object.assign(T, V.yL);
        t && (c.windowOpacity = .6,
        T.backgroundOpacity = 0);
        c.yL = T;
        var M = c.v$ === 1, J = [{
            L: "span",
            B: "captions-text",
            X: {
                style: "word-wrap: normal; display: block;"
            }
        }], S, D, Z;
        (a = a.OY("caption_edit_on_hover") && ((S = l.getVideoData().getPlayerResponse()) == null ? void 0 : (D = S.captions) == null ? void 0 : (Z = D.playerCaptionsTracklistRenderer) == null ? void 0 : Z.openTranscriptCommand)) && J.unshift({
            L: "button",
            B: "caption-edit",
            X: {
                tabindex: "0",
                "aria-label": g5G()
            },
            j: [{
                L: "svg",
                X: {
                    fill: "#e3e3e3",
                    height: "100%",
                    viewBox: "5 5 38 38",
                    width: "100%"
                },
                j: [{
                    L: "path",
                    X: {
                        d: "M9 39h2.2l24.25-24.25-1.1-1.1-1.1-1.1L9 36.8Zm-3 3v-6.4L35.4 6.2q.85-.85 2.12-.82 1.27.02 2.12.87L41.8 8.4q.85.85.85 2.1t-.85 2.1L12.4 42Zm33.5-31.55L37.45 8.4Zm-4.05 4.3-1.1-1.1-1.1-1.1 2.2 2.2Z"
                    }
                }]
            }]
        });
        g.L.call(this, {
            L: "div",
            B: "caption-window",
            X: {
                id: "caption-window-" + p.id,
                dir: M ? "rtl" : "ltr",
                tabindex: "0",
                lang: c.lang
            },
            j: J
        });
        var f = this;
        this.D = [];
        this.Sa = !1;
        this.C = p;
        this.vr = this.Wr = null;
        this.playerWidth = X;
        this.playerHeight = d;
        this.J = null;
        this.maxWidth = X * .96;
        this.maxHeight = d * .96;
        this.T = c;
        this.wy = V;
        this.b_ = C;
        this.S = this.rV("captions-text");
        this.Hc = this.S.style.getPropertyValue("box-decoration-break") !== "" || this.S.style.getPropertyValue("-webkit-box-decoration-break") !== "";
        this.Y_ = NWG(N, H, X, d);
        this.Q$ = E;
        a && (this.W = this.rV("caption-edit"),
        this.U(this.W, "click", function() {
            f.Q$()
        }));
        this.type = 0;
        this.UY = this.Y_ * Hey(T);
        this.kM = t;
        p = new g.Hx(this.element,!0);
        g.R(this, p);
        p.subscribe("dragstart", this.IS, this);
        p.subscribe("dragmove", this.sF, this);
        p.subscribe("dragend", this.xO, this);
        this.Qn = this.KS = this.X$ = this.qo = 0;
        p = "";
        this.T.windowOpacity && (p = L9P(this.T.windowColor),
        p = "rgba(" + p[0] + "," + p[1] + "," + p[2] + "," + this.T.windowOpacity + ")");
        C = {
            "background-color": p,
            display: this.T.isVisible === !1 ? "none" : "",
            "text-align": Xe8[this.T.textAlign]
        };
        this.Hc && (C["border-radius"] = p ? this.UY / 8 + "px" : "");
        (this.V = this.C.params.v$ === 2 || this.C.params.v$ === 3) && dq0(this, this.element);
        g.K2(this.element, C);
        if (t) {
            var q;
            (q = this.element.parentElement) == null || q.style.setProperty("--caption-window-color", p)
        }
        switch (this.T.Qv) {
        case 0:
        case 1:
        case 2:
            g.Ed(this.element, "ytp-caption-window-top");
            break;
        case 6:
        case 7:
        case 8:
            g.Ed(this.element, "ytp-caption-window-bottom")
        }
    }
      , dq0 = function(p, C) {
        var V = "vertical-rl";
        p.T.M_ === 1 && (V = "vertical-lr");
        g.vF && (V = V === "vertical-lr" ? "tb-lr" : "tb-rl");
        g.K2(C, "-o-writing-mode", V);
        g.K2(C, "-webkit-writing-mode", V);
        g.K2(C, "writing-mode", V);
        g.K2(C, "text-orientation", "upright");
        g.Ed(C, "ytp-vertical-caption");
        p.C.params.v$ === 3 && (g.K2(C, "text-orientation", ""),
        g.K2(C, "transform", "rotate(180deg)"))
    }
      , Hey = function(p) {
        var C = 1 + .25 * (p.fontSizeIncrement || 0);
        if (p.offset === 0 || p.offset === 2)
            C *= .8;
        return C
    }
      , iec = function(p, C) {
        var V = {}
          , N = C.background ? C.background : p.T.yL.background;
        if (C.backgroundOpacity != null || C.background) {
            var H = C.backgroundOpacity != null ? C.backgroundOpacity : p.T.yL.backgroundOpacity;
            N = L9P(N);
            V.background = "rgba(" + N[0] + "," + N[1] + "," + N[2] + "," + H + ")";
            p.Hc && (V["box-decoration-break"] = "clone",
            V["border-radius"] = p.UY / 8 + "px")
        }
        if (C.fontSizeIncrement != null || C.offset != null)
            V["font-size"] = p.Y_ * Hey(C) + "px";
        N = 1;
        H = C.color || p.T.yL.color;
        if (C.color || C.textOpacity != null)
            H = L9P(H),
            N = C.textOpacity == null ? p.T.yL.textOpacity : C.textOpacity,
            H = "rgba(" + H[0] + "," + H[1] + "," + H[2] + "," + N + ")",
            V.color = H,
            V.fill = H;
        var X = C.charEdgeStyle;
        X === 0 && (X = void 0);
        if (X) {
            H = "rgba(34, 34, 34, " + N + ")";
            var d = "rgba(204, 204, 204, " + N + ")";
            C.O9 && (d = H = C.O9);
            var a = p.Y_ / 16 / 2
              , E = Math.max(a, 1)
              , l = Math.max(2 * a, 1)
              , t = Math.max(3 * a, 1)
              , c = Math.max(5 * a, 1);
            N = [];
            switch (X) {
            case 4:
                for (; t <= c; t += a)
                    N.push(l + "px " + l + "px " + t + "px " + H);
                break;
            case 1:
                l = window.devicePixelRatio >= 2 ? .5 : 1;
                for (X = E; X <= t; X += l)
                    N.push(X + "px " + X + "px " + H);
                break;
            case 2:
                N.push(E + "px " + E + "px " + d);
                N.push("-" + E + "px -" + E + "px " + H);
                break;
            case 3:
                for (t = 0; t < 5; t++)
                    N.push("0 0 " + l + "px " + H)
            }
            V["text-shadow"] = N.join(", ")
        }
        H = "";
        switch (C.fontFamily) {
        case 1:
            H = '"Courier New", Courier, "Nimbus Mono L", "Cutive Mono", monospace';
            break;
        case 2:
            H = '"Times New Roman", Times, Georgia, Cambria, "PT Serif Caption", serif';
            break;
        case 3:
            H = '"Deja Vu Sans Mono", "Lucida Console", Monaco, Consolas, "PT Mono", monospace';
            break;
        case 5:
            H = '"Comic Sans MS", Impact, Handlee, fantasy';
            break;
        case 6:
            H = '"Monotype Corsiva", "URW Chancery L", "Apple Chancery", "Dancing Script", cursive';
            break;
        case 7:
            H = g.Qg() ? '"Carrois Gothic SC", sans-serif-smallcaps' : 'Arial, Helvetica, Verdana, "Marcellus SC", sans-serif';
            break;
        case 0:
        case 4:
            H = '"YouTube Noto", Roboto, Arial, Helvetica, Verdana, "PT Sans Caption", sans-serif'
        }
        H && (V["font-family"] = H);
        H = C.offset;
        H == null && (H = p.T.yL.offset);
        switch (H) {
        case 0:
            V["vertical-align"] = "sub";
            break;
        case 2:
            V["vertical-align"] = "super"
        }
        C.fontFamily === 7 && (V["font-variant"] = "small-caps");
        C.bold && (V["font-weight"] = "bold");
        C.italic && (V["font-style"] = "italic");
        C.underline && (V["text-decoration"] = "underline");
        C.dU && (V.visibility = "hidden");
        C.R4 === 1 && p.V && (V["text-combine-upright"] = "all",
        V["text-orientation"] = "mixed",
        H = g.gG || g.D1,
        p.C.params.v$ === 3 ? V.transform = H ? "rotate(90deg)" : "rotate(180deg)" : H && (V.transform = "rotate(-90deg)"));
        if (C.XN === 1 || C.XN === 2 || C.XN === 3 || C.XN === 4 || C.XN === 5)
            if (g.gG)
                V["font-weight"] = "bold";
            else
                switch (V["text-emphasis-style"] = "filled circle",
                V["text-emphasis-color"] = "currentcolor",
                V["webkit-text-emphasis"] = "filled circle",
                C.XN) {
                case 4:
                case 3:
                    V["text-emphasis-position"] = "under left";
                    V["webkit-text-emphasis-position"] = "under left";
                    break;
                case 5:
                case 2:
                    V["text-emphasis-position"] = "over right",
                    V["webkit-text-emphasis-position"] = "over right"
                }
        return V
    }
      , Eb = function(p) {
        p = p.split("px");
        return p.length > 0 ? (p = Number(p[0])) ? p : 0 : 0
    }
      , hCP = function(p) {
        p.J = g.iK("SPAN");
        g.K2(p.J, {
            display: "block"
        });
        g.Ed(p.J, "caption-visual-line");
        p.S.appendChild(p.J)
    }
      , sN5 = function(p, C) {
        var V = g.iK("SPAN");
        g.K2(V, {
            display: "inline-block",
            "white-space": "pre-wrap"
        });
        g.K2(V, iec(p, C));
        V.classList.add("ytp-caption-segment");
        p.J.appendChild(V);
        V.previousElementSibling && (g.K2(V.previousElementSibling, {
            "border-top-right-radius": "0",
            "border-bottom-right-radius": "0"
        }),
        g.K2(V, {
            "border-top-left-radius": "0",
            "border-bottom-left-radius": "0"
        }));
        return V
    }
      , azF = function(p, C, V) {
        p.Sa = p.Sa || !!V;
        var N = {};
        Object.assign(N, p.T.yL);
        Object.assign(N, V || C.T);
        Object.assign(N, p.wy.yL);
        (V = !p.J) && hCP(p);
        for (var H = p.Wr && p.vr && g.Y5(N, p.vr) ? p.Wr : sN5(p, N), X = typeof C.text === "string", d = X ? C.text.split("\n") : [C.text], a = 0; a < d.length; a++) {
            var E = a > 0 || !C.append
              , l = d[a];
            E && !V ? (hCP(p),
            H = sN5(p, N)) : E && V && (V = !1);
            l && (H.appendChild(X ? g.h2(l) : l),
            X || l.tagName !== "RUBY" || l.childElementCount !== 4 || g.gG || !g.u4(l.children[2], "text-emphasis") || (E = p.V ? "padding-right" : "padding-top",
            g.u4(l.children[2], "text-emphasis-position") && (E = p.V ? "padding-left" : "padding-bottom"),
            g.Nq ? g.K2(H, E, "1em") : g.K2(H, E, "0.5em")))
        }
        p.vr = N;
        p.Wr = H;
        p.D.push(C)
    }
      , NWG = function(p, C, V, N) {
        var H = C / 360 * 16;
        C >= p && (p = 640,
        N > V * 1.3 && (p = 480),
        H = V / p * 16);
        return H
    }
      , lzp = function() {
        this.V = this.time = this.mode = this.C = 0;
        this.S = new EqG(this);
        this.W = new EqG(this);
        this.T = [];
        this.clear()
    }
      , c2y = function(p, C, V) {
        if (p === 255 && C === 255 || !p && !C)
            return {
                Gs: p,
                t2: C,
                result: 0
            };
        p = tuv[p];
        C = tuv[C];
        if (p & 128) {
            var N;
            if (N = !(C & 128))
                N = C,
                N = V.GN() && V.t2 === N;
            if (N)
                return {
                    Gs: p,
                    t2: C,
                    result: 1
                }
        } else if (C & 128 && 1 <= p && p <= 31)
            return {
                Gs: p,
                t2: C,
                result: 2
            };
        return {
            Gs: p,
            t2: C,
            result: 3
        }
    }
      , MuF = function(p, C, V, N) {
        C === 255 && V === 255 || !C && !V ? (++p.V === 45 && p.reset(),
        p.S.C.clear(),
        p.W.C.clear()) : (p.V = 0,
        TW2(p.S, C, V, N))
    }
      , J21 = function(p, C) {
        p.T.sort(function(H, X) {
            var d = H.time - X.time;
            return d === 0 ? H.order - X.order : d
        });
        for (var V = g.F(p.T), N = V.next(); !N.done; N = V.next())
            N = N.value,
            p.time = N.time,
            N.type === 0 ? MuF(p, N.md, N.vl, C) : N.type === 1 && p.C & 496 && TW2(p.W, N.md, N.vl, C);
        p.T.length = 0
    }
      , lJ = function() {
        this.type = 0
    }
      , ts = function() {
        this.state = this.t2 = this.Gs = 0
    }
      , mq2 = function() {
        this.timestamp = this.T = 0
    }
      , cM = function(p) {
        this.W = p;
        this.V = [];
        this.T = this.C = this.row = 0;
        this.style = new lJ;
        for (p = this.S = 0; p <= 15; p++) {
            this.V[p] = [];
            for (var C = 0; C <= 32; C++)
                this.V[p][C] = new mq2
        }
    }
      , TL = function(p, C) {
        if (p.style.type === 3) {
            for (var V = 0, N = 0, H = p.W.time + 0, X = "", d = "", a = H, E = 1; E <= 15; ++E) {
                for (var l = !1, t = N ? N : 1; t <= 32; ++t) {
                    var c = p.V[E][t];
                    if (c.T !== 0) {
                        V === 0 && (V = E,
                        N = t);
                        l = String.fromCharCode(c.T);
                        var T = c.timestamp;
                        T < H && (H = T);
                        c.timestamp = a;
                        d && (X += d,
                        d = "");
                        X += l;
                        l = !0
                    }
                    if ((c.T === 0 || t === 32) && l) {
                        d = "\n";
                        break
                    } else if (N && !l)
                        break
                }
                if (V && !l)
                    break
            }
            X && C.S(V, N, H, a, X)
        } else
            for (N = V = 0,
            X = H = p.W.time + 0,
            d = 1; d <= 15; ++d)
                for (a = "",
                E = 1; E <= 32; ++E)
                    if (t = p.V[d][E],
                    c = t.T,
                    c !== 0 && (V === 0 && (V = d,
                    N = E),
                    l = String.fromCharCode(c),
                    T = t.timestamp,
                    T <= H && (H = T),
                    a += l,
                    t.reset()),
                    E === 32 || c === 0)
                        a && C.S(V, N, H, X, a),
                        H = X,
                        a = "",
                        N = V = 0
    }
      , DqF = function(p, C) {
        switch (p) {
        case 0:
            return vq0[(C & 127) - 32];
        case 1:
            return FS2[C & 15];
        case 2:
            return Sor[C & 31];
        case 3:
            return KSv[C & 31]
        }
        return 0
    }
      , M2 = function(p) {
        return p.V[p.row][p.C]
    }
      , Js = function(p, C, V) {
        C >= 2 && p.C > 1 && (--p.C,
        M2(p).T = 0);
        var N = M2(p);
        N.timestamp = p.W.time + 0;
        N.T = DqF(C, V);
        p.C < 32 && p.C++
    }
      , uQG = function(p, C, V, N) {
        for (var H = 0; H < N; H++)
            for (var X = 0; X <= 32; X++) {
                var d = p.V[C + H][X]
                  , a = p.V[V + H][X];
                d.T = a.T;
                d.timestamp = a.timestamp
            }
    }
      , mT = function(p, C, V) {
        for (var N = 0; N < V; N++)
            for (var H = 0; H <= 32; H++)
                p.V[C + N][H].reset()
    }
      , Ze1 = function(p) {
        p.row = p.T > 0 ? p.T : 1;
        p.C = 1;
        mT(p, 0, 15)
    }
      , Uqf = function(p) {
        this.V = p;
        this.W = 0;
        this.style = new lJ;
        this.Y = new cM(this.V);
        this.D = new cM(this.V);
        this.text = new cM(this.V);
        this.C = this.Y;
        this.S = this.D;
        this.T = this.C
    }
      , fzF = function(p, C, V) {
        var N = p.C
          , H = !1;
        switch (p.style.get()) {
        case 4:
        case 1:
        case 2:
            p.style.get() === 4 && N.T > 0 || (TL(N, V),
            Ze1(p.C),
            Ze1(p.S),
            N.row = 15,
            N.T = C,
            H = !0)
        }
        p.style.set(3);
        p.T = N;
        p.T.style = p.style;
        p.V.mode = 1 << N.S;
        H ? N.C = 1 : N.T !== C && (N.T > C ? (TL(N, V),
        mT(N, N.row - N.T, C)) : N.row < C && (C = N.T),
        N.T = C)
    }
      , Oec = function(p) {
        p.style.set(1);
        p.T = p.S;
        p.T.T = 0;
        p.T.style = p.style;
        p.V.mode = 1 << p.T.S
    }
      , y2p = function(p) {
        p.style.set(4);
        p.T = p.text;
        p.T.style = p.style;
        p.V.mode = 1 << p.T.S
    }
      , EqG = function(p) {
        this.T = p;
        this.W = 0;
        this.V = new Uqf(this.T);
        this.Y = new Uqf(this.T);
        this.C = new ts;
        this.S = this.V
    }
      , TW2 = function(p, C, V, N) {
        p.C.update();
        C = c2y(C, V, p.C);
        switch (C.result) {
        case 0:
            return;
        case 1:
        case 2:
            return
        }
        var H = C.Gs;
        V = C.t2;
        if (32 <= H || !H)
            p.T.mode & p.T.C && (C = H,
            C & 128 && (C = 127),
            V & 128 && (V = 127),
            p = p.S.T,
            C & 96 && Js(p, 0, C),
            V & 96 && Js(p, 0, V),
            C !== 0 && V !== 0 && p.style.type === 3 && TL(p, N));
        else if (H & 16)
            a: if (!p.C.matches(H, V) && (C = p.C,
            C.Gs = H,
            C.t2 = V,
            C.state = 2,
            C = H & 8 ? p.Y : p.V,
            p.S = C,
            p.T.mode = 1 << (p.W << 2) + (C.W << 1) + (C.style.type === 4 ? 1 : 0),
            (p.T.mode | 1 << (p.W << 2) + (C.W << 1) + (C.style.type !== 4 ? 1 : 0)) & p.T.C))
                if (V & 64) {
                    N = [11, 11, 1, 2, 3, 4, 12, 13, 14, 15, 5, 6, 7, 8, 9, 10][(H & 7) << 1 | V >> 5 & 1];
                    p = V & 16 ? ((V & 14) >> 1) * 4 : 0;
                    V = C.T;
                    switch (C.style.get()) {
                    case 4:
                        N = V.row;
                        break;
                    case 3:
                        if (N !== V.row) {
                            if (N < V.T && (N = V.T,
                            N === V.row))
                                break;
                            var X = 1 + V.row - V.T
                              , d = 1 + N - V.T;
                            uQG(V, d, X, V.T);
                            C = X;
                            H = V.T;
                            d < X ? (X = d + H - X,
                            X > 0 && (C += X,
                            H -= X)) : (X = X + H - d,
                            X > 0 && (H -= X));
                            mT(V, C, H)
                        }
                    }
                    V.row = N;
                    V.C = p + 1
                } else
                    switch (H & 7) {
                    case 1:
                        switch (V & 112) {
                        case 32:
                            Js(C.T, 0, 32);
                            break a;
                        case 48:
                            V === 57 ? (N = C.T,
                            M2(N).T = 0,
                            N.C < 32 && N.C++) : Js(C.T, 1, V & 15)
                        }
                        break;
                    case 2:
                        V & 32 && Js(C.T, 2, V & 31);
                        break;
                    case 3:
                        V & 32 && Js(C.T, 3, V & 31);
                        break;
                    case 4:
                    case 5:
                        if (32 <= V && V <= 47)
                            switch (V) {
                            case 32:
                                Oec(C);
                                break;
                            case 33:
                                N = C.T;
                                N.C > 1 && (--N.C,
                                M2(N).T = 0);
                                break;
                            case 36:
                                N = C.T;
                                C = M2(N);
                                for (p = 0; p <= 15; p++)
                                    for (V = 0; V <= 32; V++)
                                        if (N.V[p][V] === C) {
                                            for (; V <= 32; V++)
                                                N.V[p][V].reset();
                                            break
                                        }
                                break;
                            case 37:
                                fzF(C, 2, N);
                                break;
                            case 38:
                                fzF(C, 3, N);
                                break;
                            case 39:
                                fzF(C, 4, N);
                                break;
                            case 40:
                                Js(C.T, 0, 32);
                                break;
                            case 41:
                                C.style.set(2);
                                C.T = C.C;
                                C.T.T = 0;
                                C.T.style = C.style;
                                C.V.mode = 1 << C.T.S;
                                break;
                            case 42:
                                N = C.text;
                                N.T = 15;
                                N.style.set(4);
                                Ze1(N);
                                y2p(C);
                                break;
                            case 43:
                                y2p(C);
                                break;
                            case 44:
                                p = C.C;
                                switch (C.style.get()) {
                                case 1:
                                case 2:
                                case 3:
                                    TL(p, N)
                                }
                                mT(p, 0, 15);
                                break;
                            case 45:
                                b: {
                                    p = C.T;
                                    switch (C.style.get()) {
                                    default:
                                    case 2:
                                    case 1:
                                        break b;
                                    case 4:
                                        if (p.row < 15) {
                                            ++p.row;
                                            p.C = 1;
                                            break b
                                        }
                                        break;
                                    case 3:
                                    }
                                    p.T < 2 && (p.T = 2,
                                    p.row < p.T && (p.row = p.T));
                                    C = p.row - p.T + 1;
                                    TL(p, N);
                                    uQG(p, C, C + 1, p.T - 1);
                                    mT(p, p.row, 1)
                                }
                                break;
                            case 46:
                                mT(C.S, 0, 15);
                                break;
                            case 47:
                                TL(C.C, N),
                                C.S.updateTime(C.V.time + 0),
                                N = C.S,
                                C.S = C.C,
                                C.C = N,
                                Oec(C)
                            }
                        break;
                    case 7:
                        switch (V) {
                        case 33:
                        case 34:
                        case 35:
                            N = C.T,
                            (N.C += V & 3) > 32 && (N.C = 32)
                        }
                    }
    }
      , qo2 = function() {}
      , vM = function(p, C, V, N, H, X, d) {
        X = X === void 0 ? !1 : X;
        d = d === void 0 ? null : d;
        g.sz.call(this, p, p + C, {
            priority: V,
            namespace: "captions"
        });
        this.windowId = N;
        this.text = H;
        this.append = X;
        this.T = d
    }
      , beY = function(p, C, V, N, H, X, d) {
        var a = X[0]
          , E = d[a.getAttribute("p")];
        if (E.kB === 1) {
            var l = X[1]
              , t = X[2];
            X = X[3];
            a.getAttribute("t");
            l.getAttribute("t");
            t.getAttribute("t");
            X.getAttribute("t");
            a.getAttribute("p");
            l.getAttribute("p");
            X.getAttribute("p");
            d = d[t.getAttribute("p")];
            a = Izp(a.textContent, l.textContent, t.textContent, X.textContent, d);
            return new vM(p,C,H,V,a,N,E)
        }
        switch (E.kB) {
        case 9:
        case 10:
            E.XN = 1;
            break;
        case 11:
            E.XN = 2;
            break;
        case 12:
            E.XN = 3;
            break;
        case 13:
            E.XN = 4;
            break;
        case 14:
            E.XN = 5
        }
        return new vM(p,C,H,V,a.textContent || "",N,E)
    }
      , Izp = function(p, C, V, N, H) {
        var X = g.Qg()
          , d = X ? g.iK("DIV") : g.iK("RUBY")
          , a = g.iK("SPAN");
        a.textContent = p;
        d.appendChild(a);
        p = X ? g.iK("DIV") : g.iK("RP");
        p.textContent = C;
        d.appendChild(p);
        C = X ? g.iK("DIV") : g.iK("RT");
        C.textContent = V;
        d.appendChild(C);
        V = H.kB;
        if (V === 10 || V === 11 || V === 12 || V === 13 || V === 14)
            if (g.K2(C, "text-emphasis-style", "filled circle"),
            g.K2(C, "text-emphasis-color", "currentcolor"),
            g.K2(C, "webkit-text-emphasis", "filled circle"),
            H.kB === 11 || H.kB === 13)
                g.K2(C, "webkit-text-emphasis-position", "under left"),
                g.K2(C, "text-emphasis-position", "under left");
        V = !0;
        if (H.kB === 4 || H.kB === 7 || H.kB === 12 || H.kB === 14)
            g.K2(d, "ruby-position", "over"),
            g.K2(d, "-webkit-ruby-position", "before");
        else if (H.kB === 5 || H.kB === 6 || H.kB === 11 || H.kB === 13)
            g.K2(d, "ruby-position", "under"),
            g.K2(d, "-webkit-ruby-position", "after"),
            V = !1;
        H = X ? g.iK("DIV") : g.iK("RP");
        H.textContent = N;
        d.appendChild(H);
        X && (N = V,
        g.K2(d, {
            display: "inline-block",
            position: "relative"
        }),
        X = d.firstElementChild.nextElementSibling,
        g.K2(X, "display", "none"),
        X = X.nextElementSibling,
        g.K2(X, {
            "font-size": "0.5em",
            "line-height": "1.2em",
            "text-align": "center",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            width: "400%"
        }),
        g.K2(d.lastElementChild, "display", "none"),
        N ? (g.K2(d, "padding-top", "0.6em"),
        g.K2(X, "top", "0")) : (g.K2(d, "padding-bottom", "0.6em"),
        g.K2(X, "bottom", "0")));
        return d
    }
      , FS = function() {
        g.Y.apply(this, arguments)
    }
      , S$ = function(p, C, V, N, H) {
        g.sz.call(this, p, p + C, {
            priority: V,
            namespace: "captions"
        });
        this.id = N;
        this.params = H;
        this.T = []
    }
      , A2Y = function(p) {
        var C = "_" + K9++;
        return new S$(0,0x8000000000000,0,C,p)
    }
      , DI = function(p) {
        FS.call(this);
        this.V = p;
        this.pens = {};
        this.D = {};
        this.J = {};
        this.S = "_" + K9++;
        this.Y = {};
        this.C = this.T = null;
        this.W = !0
    }
      , uJ = function(p, C) {
        p = p.getAttribute(C);
        if (p != null)
            return Number(p)
    }
      , ZI = function(p, C) {
        p = p.getAttribute(C);
        if (p != null)
            return p === "1"
    }
      , Ub = function(p, C) {
        p = uJ(p, C);
        return p !== void 0 ? p : null
    }
      , Ob = function(p, C) {
        p = p.getAttribute(C);
        if (p != null)
            return f9.test(p),
            p
    }
      , oqv = function(p, C) {
        var V = {}
          , N = C.getAttribute("ws");
        Object.assign(V, N ? p.J[N] : p.V);
        p = Ub(C, "mh");
        p != null && (V.JS = p);
        p = Ub(C, "ju");
        p != null && (V.textAlign = p);
        p = Ub(C, "pd");
        p != null && (V.v$ = p);
        p = Ub(C, "sd");
        p != null && (V.M_ = p);
        p = Ob(C, "wfc");
        p != null && (V.windowColor = p);
        C = uJ(C, "wfo");
        C !== void 0 && (V.windowOpacity = C / 255);
        return V
    }
      , kOc = function(p, C) {
        var V = {}
          , N = C.getAttribute("wp");
        N && Object.assign(V, p.D[N]);
        p = Ub(C, "ap");
        p != null && (V.Qv = p);
        p = uJ(C, "cc");
        p != null && (V.l6 = p);
        p = uJ(C, "ah");
        p != null && (V.Ev = p);
        p = uJ(C, "rc");
        p != null && (V.ZJ = p);
        C = uJ(C, "av");
        C != null && (V.qX = C);
        return V
    }
      , xqf = function(p, C, V, N) {
        var H = {};
        Object.assign(H, kOc(p, C));
        Object.assign(H, oqv(p, C));
        N ? g.Y5(H, p.V) ? (N = p.S,
        H = p.V) : N = "_" + K9++ : N = C.getAttribute("id") || "_" + K9++;
        p = uJ(C, "t") + V;
        C = uJ(C, "d") || 0x8000000000000;
        if (H.v$ === 2 || H.v$ === 3)
            V = H.ZJ,
            H.ZJ = H.l6,
            H.l6 = V;
        return new S$(p,C,0,N,H)
    }
      , ye = function(p) {
        FS.call(this);
        this.W = p;
        this.T = new Map;
        this.V = new Map;
        this.S = new Map;
        this.C = new Map
    }
      , q2 = function(p) {
        p = g.J9(Math.round(p), 0, 16777215).toString(16).toUpperCase();
        return "#000000".substring(0, 7 - p.length) + p
    }
      , YoF = function(p, C, V, N, H) {
        N === 0 && (N = 0x8000000000000);
        var X = {};
        C.wpWinPosId && Object.assign(X, p.V.get(C.wpWinPosId));
        C.wsWinStyleId && Object.assign(X, p.S.get(C.wsWinStyleId));
        p = C.rcRowCount;
        p !== void 0 && (X.ZJ = p);
        C = C.ccColCount;
        C !== void 0 && (X.l6 = C);
        if (X.v$ === 2 || X.v$ === 3)
            C = X.ZJ,
            X.ZJ = X.l6,
            X.l6 = C;
        return new S$(V,N,0,H,X)
    }
      , In = function(p, C, V) {
        g.Ar.call(this, p);
        this.videoData = C;
        this.audioTrack = V;
        this.W = C.AI
    }
      , bJ = function(p, C, V, N, H, X, d, a, E, l) {
        an.call(this, p, C, V, N, H, X, d, a, E, l);
        this.type = 1
    }
      , As = function(p, C, V) {
        this.trackData = p;
        this.Y = V;
        this.version = this.W = this.V = this.byteOffset = 0;
        this.C = [];
        this.T = new DataView(this.trackData)
    }
      , on = function(p) {
        var C = p.byteOffset;
        p.byteOffset += 1;
        return p.T.getUint8(C)
    }
      , kn = function(p) {
        var C = p.byteOffset;
        p.byteOffset += 4;
        return p.T.getUint32(C)
    }
      , xn = function(p, C) {
        FS.call(this);
        this.C = p;
        this.V = C;
        this.track = this.V.languageName === "CC3" ? 4 : 0;
        this.T = new lzp;
        this.T.C = 1 << this.track
    }
      , RCy = function(p) {
        if (typeof p === "string")
            return !1;
        p = new As(p,8,0);
        return zC1(p)
    }
      , zC1 = function(p) {
        if (!(p.byteOffset < p.T.byteLength) || kn(p) !== 1380139777)
            return !1;
        p.version = on(p);
        if (p.version > 1)
            return !1;
        on(p);
        on(p);
        on(p);
        return !0
    }
      , Yn = function(p, C, V, N, H, X, d, a, E, l) {
        an.call(this, p, C, V, N, H, X, d, a, E, l);
        var t = this;
        this.type = 2;
        this.sY = [];
        this.a$ = this.Z = this.Ga = 0;
        this.Vn = NaN;
        this.ER = 0;
        this.YM = null;
        this.R$ = new g.N8(this.qRV,433,this);
        this.W && (l.createClientVe(this.W, this, 167342),
        this.U(this.W, "click", function() {
            l.logClick(t.W)
        }),
        p = new g.Hx(this.element,!0),
        g.R(this, p),
        p.subscribe("hoverstart", function() {
            l.logVisibility(t.W, !0)
        }, this));
        g.Ed(this.element, "ytp-caption-window-rollup");
        g.R(this, this.R$);
        g.K2(this.element, "overflow", "hidden")
    }
      , nqE = function(p, C) {
        if (!C)
            return "";
        p.V && p.C.params.M_ !== 1 && (C *= -1);
        return "translate" + (p.V ? "X" : "Y") + "(" + C + "px)"
    }
      , eCy = function(p) {
        p.sY = Array.from(document.getElementsByClassName("caption-visual-line"));
        for (var C = p.C.params.ZJ, V = 0, N = 0, H = p.sY.length - 1; V < C && H > -1; ) {
            var X = p.sY[H];
            N += p.V ? X.offsetWidth : X.offsetHeight;
            V++;
            H--
        }
        p.Z = N;
        C = Math;
        V = C.max;
        isNaN(p.Vn) && ((N = p.T.l6) ? (H = g.iK("SPAN"),
        g.ce(H, "\u2013".repeat(N)),
        g.K2(H, iec(p, p.T.yL)),
        p.S.appendChild(H),
        p.Vn = H.offsetWidth,
        p.S.removeChild(H)) : p.Vn = 0);
        N = p.S;
        p.a$ = V.call(C, p.Vn, p.ER, (p.V ? N.offsetHeight : N.offsetWidth) + 1)
    }
      , PK2 = function(p, C) {
        eCy(p);
        var V = p.sY.reduce(function(X, d) {
            return (p.V ? d.offsetWidth : d.offsetHeight) + X
        }, 0);
        V = p.Z - V;
        if (V !== p.Ga) {
            var N = V > 0 && p.Ga === 0
              , H = V < p.Ga;
            C || isNaN(V) || N || !H || (g.Ed(p.element, "ytp-rollup-mode"),
            g.HF(p.R$));
            g.K2(p.S, "transform", nqE(p, V));
            p.Ga = V
        }
        eCy(p)
    }
      , wey = function(p, C) {
        g.Ar.call(this, C);
        this.C = p;
        this.N = C;
        this.logger = new g.HI("caps");
        this.V = this.Y = this.D = null
    }
      , $qy = function(p, C, V, N) {
        p.logger.debug(function() {
            return "SABR captions data received for " + N
        });
        p.D ? p.Y == null ? p.logger.T(350058965, "Null loaded track meta data at captions data received") : V.b3(C, p.Y, (N + p.N.yZ()) * 1E3) : p.logger.T(350058965, "Null Representation at captions data received")
    }
      , LSv = function(p, C) {
        var V = [], N;
        for (N in p.C.T)
            if (p.C.T.hasOwnProperty(N)) {
                var H = p.C.T[N];
                if (g.kW(H, C || null)) {
                    var X = H.info.id
                      , d = X
                      , a = "." + X
                      , E = ""
                      , l = "";
                    if (H = H.info.captionTrack)
                        X = H.languageCode,
                        d = H.displayName,
                        a = H.vssId,
                        E = H.kind,
                        l = H.id;
                    V.push(new g.is({
                        id: N,
                        languageCode: X,
                        languageName: d,
                        is_servable: !0,
                        is_default: !0,
                        is_translateable: !1,
                        vss_id: a,
                        kind: E,
                        captionId: l
                    }))
                }
            }
        return V
    }
      , gq5 = function(p, C) {
        return C != null && C in p.C.T ? p.C.T[C] : null
    }
      , WSF = function(p, C, V) {
        var N = [], H;
        for (H in p.C.T)
            if (p.C.T.hasOwnProperty(H)) {
                var X = p.C.T[H];
                if (g.kW(X, V || null)) {
                    var d = X.info.captionTrack;
                    d && d.languageCode === C && N.push(X)
                }
            }
        return N.length ? N[0] : null
    }
      , QNF = function(p, C) {
        if (!p.G("html5_enable_sabr_live_captions") || p.T != null && g.qz(C.K()) && !p.T.isManifestless && p.T.T.rawcc != null || !p.p4())
            return !1;
        C = !!p.T && p.T.isManifestless && Object.values(p.T.T).some(function(V) {
            return g.kW(V, "386")
        });
        p = !!p.T && !p.T.isManifestless && g.yVY(p.T);
        return C || p
    }
      , zL = function() {
        FS.call(this)
    }
      , r2P = function(p, C, V, N, H, X, d, a, E) {
        switch (d.tagName) {
        case "b":
            a.bold = !0;
            break;
        case "i":
            a.italic = !0;
            break;
        case "u":
            a.underline = !0
        }
        for (var l = 0; l < d.childNodes.length; l++) {
            var t = d.childNodes[l];
            if (t.nodeType === 3)
                t = new vM(C,V,N,H.id,t.nodeValue,X || l > 0,g.k5(a) ? void 0 : a),
                E.push(t),
                H.T.push(t);
            else {
                var c = {};
                Object.assign(c, a);
                r2P(p, C, V, N, H, !0, t, c, E)
            }
        }
    }
      , BW8 = function(p) {
        var C = p.split(":");
        p = 0;
        C = g.F(C);
        for (var V = C.next(); !V.done; V = C.next())
            p = p * 60 + Number(V.value);
        return p * 1E3
    }
      , GOp = function(p, C, V, N) {
        N = Object.assign({
            JS: 0
        }, N);
        return new S$(p,C,V,"_" + K9++,N)
    }
      , Rn = function(p, C) {
        g.Y.call(this);
        this.N = p;
        this.yn = C;
        this.T = null;
        this.C = this.N.dH();
        this.logger = new g.HI("caps")
    }
      , Cmc = function(p, C, V) {
        if (typeof C === "string" || RCy(C))
            return [{
                trackData: C,
                oE: V
            }];
        var N = new DataView(C);
        if (N.byteLength <= 8 || N.getUint32(4) !== 1718909296)
            return [];
        var H = g.KkQ(N);
        if (p.C && H) {
            var X = g.cyv(H)
              , d = g.Tns(H);
            H = H.ox;
            X && H && p.C.Tn(H, X, d)
        }
        p = g.B1(N, 1835295092);
        if (!p || !p.length || !p[0].size)
            return [];
        X = [];
        for (d = 0; d < p.length; d++)
            H = p[d],
            H = new Uint8Array(C,H.dataOffset,H.size - (H.dataOffset - H.offset)),
            H = g.wc(H),
            X.push({
                trackData: H,
                oE: V + d * 1E3
            });
        pXY(N, X, V);
        return X = X.filter(function(a) {
            return !!a.trackData
        })
    }
      , pXY = function(p, C, V) {
        var N = g.eo(p, 0, 1836476516)
          , H = 9E4;
        N && (H = g.P1(N) || 9E4);
        N = 0;
        for (var X = g.B1(p, 1836019558), d = 0; d < X.length; d++) {
            var a = X[d];
            d < C.length && (a = g.eo(p, a.dataOffset, 1953653094)) && (a = g.eo(p, a.dataOffset, 1952867444)) && (a = g.QS(a) / H * 1E3,
            d === 0 && (N = a),
            C[d].oE = a - N + V || V * d * 1E3)
        }
    }
      , jb2 = function(p) {
        var C = {};
        if (p = g.aI(p))
            C.lang = p,
            g.kpc.test(p) && (C.v$ = 1);
        return C
    }
      , n9 = function(p) {
        g.IT.call(this, p);
        var C = this;
        this.N = p;
        this.Wr = [];
        this.sY = {};
        this.R$ = {};
        this.J = !1;
        this.S = "NONE";
        this.T = this.Z = this.a$ = this.Y_ = this.qo = null;
        this.ER = {
            m$: function() {
                C.m$()
            },
            b3: function(X, d, a, E) {
                C.b3(X, d, a, E)
            }
        };
        this.C = null;
        this.yn = this.N.K();
        this.videoData = this.N.getVideoData();
        this.X$ = this.N.dV();
        var V;
        this.Qn = (V = this.N.getVideoData(1)) == null ? void 0 : g.pf(V);
        this.V = {
            yL: {}
        };
        this.Y = {
            yL: {}
        };
        g.s5(this.videoData) ? this.S = "OFFLINE" : QNF(this.videoData, this.N) ? this.S = "SABR_LIVE" : g.qtV(this.videoData, this.N) ? this.S = "LIVE" : this.videoData.captionTracks.length ? this.S = "INNERTUBE" : this.videoData.iW && (this.S = "TTS");
        this.UY = this.yn.controlsType === "3";
        this.KS = new Rn(this.N,this.yn);
        this.Vn = new g.Rr(this);
        this.D = new g.L({
            L: "div",
            B: "ytp-caption-window-container",
            X: {
                id: "ytp-caption-window-container"
            }
        });
        this.b_ = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            width: 1,
            height: 1
        };
        V = null;
        var N = g.eJ("yt-html5-player-modules::subtitlesModuleData");
        N && (V = new g.bI(N));
        this.storage = V;
        var H;
        this.Wc = !((H = p.Nt()) == null || !H.o1());
        this.W = VSG(this);
        this.Sa = !this.W && this.UY && this.Wc && (this.S === "LIVE" || this.S === "SABR_LIVE");
        g.R(this, this.KS);
        this.W ? this.Ga = this.vr = null : (this.vr = new g.V2(this.V7,void 0,this),
        g.R(this, this.vr),
        this.Ga = new g.N8(this.tdn,2E3,this),
        g.R(this, this.Ga));
        g.R(this, this.Vn);
        g.LT(this.player, this.D.element, 4);
        g.R(this, this.D);
        this.W || this.Vn.U(p, "resize", this.uo);
        (this.kM = g.fI(this.yn) && !g.Sz() && !this.N.isFullscreen() && !this.W && !this.Sa) && this.Vn.U(p, "resize", this.Cxn);
        this.Vn.U(p, "onPlaybackAudioChange", this.fea);
        this.Vn.U(p, g.Ez("captions"), function(X) {
            C.onCueRangeEnter(X)
        });
        this.Vn.U(p, g.lG("captions"), function(X) {
            C.onCueRangeExit(X)
        });
        this.Qn && this.Vn.U(p, "videodatachange", function(X, d) {
            C.onVideoDataChange(X, d)
        });
        NA2(this, W95() || {});
        this.player.Ba("onCaptionsModuleAvailable")
    }
      , d7P = function(p) {
        if (p.yn.kM === 1 || p.videoData.FD === 1 || g.Fx(p.videoData, "yt:cc") === "alwayson")
            return !0;
        if (p.videoData.captionTracks.length)
            var C = p.getAudioTrack().C;
        if (p.yn.kM === 2) {
            if (g.wG(p.yn))
                var V = HJ5(p);
            else if (p.storage)
                try {
                    V = p.storage.get("module-enabled")
                } catch (H) {
                    p.storage.remove("module-enabled")
                }
            else
                V = null;
            if (V != null)
                return !!V
        }
        V = zQr(p.player.getAudioTrack(), g.wG(p.yn));
        var N = g.Fx(p.videoData, "yt:cc");
        if (XXG(p) === void 0) {
            if (V === "CAPTIONS_INITIAL_STATE_ON_RECOMMENDED")
                return N ? N === "on" : !0;
            if (V === "CAPTIONS_INITIAL_STATE_OFF_RECOMMENDED")
                return N === "on"
        } else
            return N === "on";
        return C === "ON" || g.Fx(p.videoData, "yt:cc") === "on"
    }
      , e$ = function(p, C) {
        if (p.C && (C === void 0 || !C) || !p.videoData.captionTracks.length)
            return !1;
        p = p.getAudioTrack();
        return !!p.T || p.C === "FORCED_ON"
    }
      , XXG = function(p) {
        var C = void 0
          , V = g.LK(g.$l(), 65);
        if (g.wG(p.yn) && V != null) {
            if (HJ5(p) != null)
                return !1;
            C = !V
        }
        return C
    }
      , w5 = function(p, C) {
        if (!p.T)
            return null;
        if (p.Z && p.Z.S)
            return p.Z.S;
        C = iJF(p, C);
        C = g.vx(p.T.T, C);
        var V = null;
        if (RQy(p.yn)) {
            var N = p.N.isInline() ? void 0 : g.zW("yt-player-caption-sticky-language");
            for (var H = [N, p.videoData.captionsLanguagePreference, p.yn.captionsLanguagePreference, g.Fx(p.videoData, "yt:cc_default_lang")], X = !1, d = 0; d < H.length; d++) {
                var a = H[d];
                if (a) {
                    X = !0;
                    for (var E = 0; E < C.length; E++)
                        if (g.aI(C[E]) === a)
                            return C[E];
                    for (E = 0; E < C.length; E++)
                        if (g.aI(C[E]).split("-")[0] === a.split("-")[0])
                            return C[E]
                }
            }
            if (X && p.T && (H = p.T.W,
            H.length))
                for (H = g.F(H),
                X = H.next(); !X.done; X = H.next())
                    if (X = X.value,
                    X.languageCode === N) {
                        V = X;
                        break
                    }
        } else
            for (N = [p.videoData.captionsLanguagePreference, p.yn.captionsLanguagePreference, g.Fx(p.videoData, "yt:cc_default_lang")],
            H = 0; H < N.length; H++)
                for (X = 0; X < C.length; X++)
                    if (g.aI(C[X]) === N[H])
                        return C[X];
        N = null;
        p.Z && p.Z.V && (N = p.Z.V);
        N || (N = C.find(function(l) {
            return l.isDefault
        }) || null);
        N || (N = C[0] || PM(p));
        N && V && g.aI(N).split("-")[0] !== V.languageCode.split("-")[0] && (N = n58(N, V));
        return N
    }
      , PM = function(p) {
        return p.Z && p.Z.T
    }
      , $n = function(p) {
        var C = PM(p);
        return !!C && p.C === C
    }
      , hN0 = function(p, C) {
        var V = p.N.Nt().V$().textTracks;
        p = p.C.toString();
        for (var N = 0; N < V.length; N++) {
            var H = V[N];
            H.id === p && (C ? H.mode !== "showing" && (H.mode = "showing") : H.mode === "showing" && (H.mode = "disabled"))
        }
    }
      , WM = function(p, C, V) {
        p.loaded && p.unload();
        V != null && (p.J = V,
        p.J && (g.wG(p.yn) ? L9(p, !!C) : g5(p, !!C)));
        p.yn.G("html5_report_caption_format_change") && sbY(p, p.C, C, p.J, !1);
        p.C = C;
        e$(p) && (C = PM(p),
        p.yn.G("html5_report_caption_format_change") && sbY(p, p.C, C, p.J, !0),
        p.C = C);
        var N;
        aC8(p, (N = p.C) != null ? N : void 0);
        p.load()
    }
      , lCy = function(p, C) {
        if (C instanceof S$) {
            var V = p.sY[C.id];
            V && V.C !== C && (V.dispose(),
            delete p.sY[C.id],
            V = null);
            V || (V = E7F(p, C)) && (p.sY[C.id] = V)
        } else
            V = C.windowId,
            p.R$[V] || (p.R$[V] = []),
            p.R$[V].push(C)
    }
      , E7F = function(p, C) {
        var V = tS2(p);
        if (!V)
            return null;
        var N = p.C ? g.aI(p.C) : null;
        N && g.kpc.test(N) && (C.params.v$ = 1);
        var H = p.X$.getPlayerSize();
        N = H.height * p.b_.height;
        H = H.width * p.b_.width;
        p.yn.playerStyle !== "google-live" || p.V.isDefault || Object.assign(C.params, p.V);
        switch (C.params.JS != null ? C.params.JS : C.T.length > 1 ? 1 : 0) {
        case 1:
            return new bJ(C,p.V,p.Y,V.width,V.height,H,N,p.yn.experiments,p.SR.bind(p),p.N);
        case 2:
            return new Yn(C,p.V,p.Y,V.width,V.height,H,N,p.yn.experiments,p.SR.bind(p),p.N);
        default:
            return new an(C,p.V,p.Y,V.width,V.height,H,N,p.yn.experiments,p.SR.bind(p),p.N)
        }
    }
      , NA2 = function(p, C, V) {
        V = V === void 0 ? !1 : V;
        var N = Qe.yL;
        p.V = {};
        Object.assign(p.V, Qe);
        p.V.yL = {};
        Object.assign(p.V.yL, N);
        p.Y = {
            yL: {}
        };
        var H = C.backgroundOverride ? p.Y : p.V
          , X = C.background || N.background;
        f9.test(X);
        H.yL.background = X;
        H = C.colorOverride ? p.Y : p.V;
        X = C.color || N.color;
        f9.test(X);
        H.yL.color = X;
        H = C.windowColorOverride ? p.Y : p.V;
        X = C.windowColor || Qe.windowColor;
        f9.test(X);
        H.windowColor = X;
        H = C.backgroundOpacityOverride ? p.Y : p.V;
        X = C.backgroundOpacity;
        X == null && (X = N.backgroundOpacity);
        H.yL.backgroundOpacity = X;
        H = C.fontSizeIncrementOverride ? p.Y : p.V;
        X = C.fontSizeIncrement;
        X == null && (X = N.fontSizeIncrement);
        H.yL.fontSizeIncrement = X;
        X = C.fontStyleOverride ? p.Y : p.V;
        H = C.fontStyle;
        H == null && (H = N.bold && N.italic ? 3 : N.bold ? 1 : N.italic ? 2 : 0);
        X = X.yL;
        switch (H) {
        case 1:
            X.bold = !0;
            delete X.italic;
            break;
        case 2:
            delete X.bold;
            X.italic = !0;
            break;
        case 3:
            X.bold = !0;
            X.italic = !0;
            break;
        default:
            delete X.bold,
            delete X.italic
        }
        H = C.textOpacityOverride ? p.Y : p.V;
        X = C.textOpacity;
        X == null && (X = N.textOpacity);
        H.yL.textOpacity = X;
        H = C.windowOpacityOverride ? p.Y : p.V;
        X = C.windowOpacity;
        X == null && (X = Qe.windowOpacity);
        H.windowOpacity = X;
        H = C.charEdgeStyleOverride ? p.Y : p.V;
        X = C.charEdgeStyle;
        X == null && (X = N.charEdgeStyle);
        H.yL.charEdgeStyle = X;
        H = C.fontFamilyOverride ? p.Y : p.V;
        X = C.fontFamily;
        X == null && (X = N.fontFamily);
        H.yL.fontFamily = X;
        p.loaded && p.uo();
        V && g.Yl("yt-player-caption-display-settings", C, 2592E3)
    }
      , c8r = function(p, C) {
        if (!p.T)
            return {};
        if (C) {
            p.yn.G("html5_report_caption_format_intent") && !g.k5(C) && p.eO(C.vss_id, "m");
            if (p.W || !g.Pv(C))
                return;
            if (g.k5(C)) {
                WM(p, null, !0);
                return
            }
            for (var V, N = g.vx(p.T.T, !0), H = 0; H < N.length; H++) {
                var X = N[H];
                X.languageCode !== C.languageCode || V && (X.languageName !== C.languageName || (X.captionId || "") !== (C.captionId || "") || g.hA(X) !== C.displayName) || (V = C.translationLanguage ? n58(X, C.translationLanguage) : X)
            }
            p.wr(C.position);
            !V || V === p.C && p.loaded || (C = g.e3(),
            N = g.aI(V),
            C.length && N === C[C.length - 1] || (C.push(N),
            g.Yl("yt-player-caption-language-preferences", C)),
            RQy(p.yn) && !p.N.isInline() && g.Yl("yt-player-caption-sticky-language", N, 2592E3),
            WM(p, V, !0))
        } else
            return p.loaded && p.C && !$n(p) ? g.sj(p.C) : {};
        return ""
    }
      , MSE = function(p, C, V) {
        C && !p.a$ ? (C = A2Y({
            v$: 0,
            lang: "en"
        }),
        p.a$ = [C, new vM(C.start,C.end - C.start,0,C.id,V != null ? V : "Captions look like this")],
        p.player.d7(p.a$)) : !C && p.a$ && (TAv(p, p.a$),
        p.a$ = null)
    }
      , TAv = function(p, C) {
        p.player.p$(C);
        C = g.F(C);
        for (var V = C.next(); !V.done; V = C.next())
            g.rY(p.Wr, V.value);
        iJ(p.vr)
    }
      , aC8 = function(p, C) {
        p.yn.G("html5_modify_caption_vss_logging") && (p.videoData.Hv = C)
    }
      , tS2 = function(p) {
        var C = p.X$.getVideoContentRect(!0).height
          , V = p.X$.getVideoContentRect(!0).width;
        if (!C || !V)
            return null;
        C *= p.b_.height;
        V *= p.b_.width;
        return {
            width: V,
            height: C
        }
    }
      , g5 = function(p, C) {
        if (p.storage)
            try {
                p.storage.set("module-enabled", C)
            } catch (V) {}
    }
      , L9 = function(p, C) {
        p.N.isInline() || g.Yl("yt-player-sticky-caption", C, 2592E3)
    }
      , HJ5 = function(p) {
        if (!p.N.isInline())
            return g.zW("yt-player-sticky-caption")
    }
      , VSG = function(p) {
        var C, V = !((C = p.N.Nt()) == null || !C.wf());
        return p.UY && V && p.S !== "LIVE" && p.S !== "SABR_LIVE"
    }
      , iJF = function(p, C) {
        g.jQ(p.videoData) && (C = !0);
        C || (C = p.S === "TTS" ? !1 : p.S === "INNERTUBE" ? !1 : !0);
        return C || p.yn.G("web_deprecate_always_includes_asr_setting") && g.wG(p.yn) ? !0 : !!g.LK(g.$l(), 66)
    }
      , sbY = function(p, C, V, N, H) {
        H ? p.Qo(V, !0, "g") : N ? C ? p.Qo(V, !!V, "m") : V && p.Qo(V, !0, "m") : !C && V && p.Qo(V, !0, "s")
    };
    g.Ar.prototype.H2 = g.Ns(55, function() {
        return !1
    });
    g.Ar.prototype.HS = g.Ns(54, function() {});
    g.oT.prototype.HS = g.Ns(53, function(p, C, V) {
        var N = this;
        this.fS();
        C = this.Es(p, C);
        var H = this.ea.K().G("html5_report_captions_ctmp_qoe")
          , X = (0,
        g.Ip)();
        this.MX();
        Y_Y(this, C, {
            format: "RAW",
            onSuccess: function(d) {
                N.C = null;
                if (H) {
                    var a = (d.responseText.length / 1024).toFixed()
                      , E = (0,
                    g.Ip)();
                    N.videoData.k_("capresp", {
                        ms: E - X,
                        kb: a
                    })
                }
                V.b3(d.responseText, p)
            },
            onError: H ? function(d) {
                var a;
                d = (a = d == null ? void 0 : d.status) != null ? a : 0;
                N.videoData.k_("capfail", {
                    status: d
                })
            }
            : void 0,
            withCredentials: !0
        })
    });
    g.xW.prototype.HS = g.Ns(52, function(p, C, V) {
        var N = this;
        this.fS();
        C = this.Es(p, C);
        this.MX();
        this.C = g.qU(C, {
            format: "RAW",
            onSuccess: function(H) {
                N.C = null;
                V.b3(H.responseText, p)
            },
            withCredentials: !0
        })
    });
    g.li.prototype.nf = g.Ns(51, function() {
        for (var p = g.Ce(document, "track", void 0, this.T), C = 0; C < p.length; C++)
            g.lK(p[C])
    });
    g.z8.prototype.nf = g.Ns(50, function() {
        this.mediaElement.nf()
    });
    g.li.prototype.o1 = g.Ns(49, function() {
        return !(!this.T.textTracks || !this.T.textTracks.addEventListener)
    });
    g.z8.prototype.o1 = g.Ns(48, function() {
        return this.mediaElement.o1()
    });
    g.li.prototype.wf = g.Ns(47, function() {
        return !!this.T.textTracks
    });
    g.z8.prototype.wf = g.Ns(46, function() {
        return this.mediaElement.wf()
    });
    g.li.prototype.Qm = g.Ns(45, function(p) {
        for (var C = 0; C < p.length; C++)
            this.T.appendChild(p[C])
    });
    g.z8.prototype.Qm = g.Ns(44, function(p) {
        this.mediaElement.Qm(p)
    });
    g.aV.prototype.Tn = g.Ns(40, function(p, C, V) {
        this.GB.Tn(p, C, V)
    });
    g.W$.prototype.Tn = g.Ns(39, function(p, C, V) {
        this.vr.set(p, {
            w2: C,
            Ja: V
        })
    });
    g.aV.prototype.FZ = g.Ns(38, function(p) {
        return this.GB.FZ(p)
    });
    g.W$.prototype.FZ = g.Ns(37, function(p) {
        var C = 2;
        this.Y.has(p) ? C = 0 : g.cge(this, p) && (C = 1);
        return C
    });
    g.HI.prototype.T = g.Ns(36, function(p) {
        g.U6u.apply(null, [6, this.tag, p].concat(g.K(g.US.apply(1, arguments))))
    });
    g.xj.prototype.eO = g.Ns(34, function(p, C) {
        var V = g.O5(this.app);
        V && V.eO(p, C)
    });
    g.yb.prototype.eO = g.Ns(33, function(p, C) {
        p = [p, C];
        g.OZ(this, g.Zn(this.provider), "cfi", p)
    });
    g.wX.prototype.eO = g.Ns(32, function(p, C) {
        this.qoe && this.qoe.eO(p, C)
    });
    g.JH.prototype.eO = g.Ns(31, function(p, C) {
        this.Pc().eO(p, C)
    });
    g.xj.prototype.Qo = g.Ns(30, function(p, C, V) {
        var N = g.O5(this.app);
        N && N.Qo(p, C, V)
    });
    g.yb.prototype.Qo = g.Ns(29, function(p, C, V) {
        if (this.Ga !== p || this.Q$ !== C)
            C = C === "rawcc" ? "" : C,
            V = [p, C, this.Ga, V],
            g.OZ(this, g.Zn(this.provider), "cfs", V),
            this.Ga = p,
            this.Q$ = C
    });
    g.wX.prototype.Qo = g.Ns(28, function(p, C, V) {
        this.qoe && this.qoe.Qo(p, C, V)
    });
    g.JH.prototype.Qo = g.Ns(27, function(p, C, V) {
        this.Pc().Qo(p, C, V)
    });
    g.Hu.prototype.ST = g.Ns(18, function() {
        return this.D
    });
    g.vN.prototype.ST = g.Ns(17, function() {
        var p;
        return ((p = g.O5(this)) == null ? void 0 : p.dH()) || null
    });
    g.xj.prototype.dH = g.Ns(16, function() {
        return this.app.ST()
    });
    g.JH.prototype.dH = g.Ns(15, function() {
        var p;
        return ((p = this.nS) == null ? void 0 : p.ST()) || null
    });
    g.fw.prototype.ma = g.Ns(1, function(p) {
        return (p = this.xz(p)) ? p.T : 0
    });
    g.Cb.prototype.ma = g.Ns(0, function() {
        return 0
    });
    var $$2 = /#(.)(.)(.)/
      , wGv = /^#(?:[0-9a-f]{3}){1,2}$/i
      , pey = {
        aa: "Afar",
        ab: "Abkhazian",
        ace: "Acehnese",
        ach: "Acoli",
        ada: "Adangme",
        ady: "Adyghe",
        ae: "Avestan",
        aeb: "Tunisian Arabic",
        af: "Afrikaans",
        afh: "Afrihili",
        agq: "Aghem",
        ain: "Ainu",
        ak: "Akan",
        akk: "Akkadian",
        akz: "Alabama",
        ale: "Aleut",
        aln: "Gheg Albanian",
        alt: "Southern Altai",
        am: "Amharic",
        an: "Aragonese",
        ang: "Old English",
        anp: "Angika",
        ar: "Arabic",
        ar_001: "Arabic (world)",
        arc: "Aramaic",
        arn: "Mapuche",
        aro: "Araona",
        arp: "Arapaho",
        arq: "Algerian Arabic",
        ars: "Najdi Arabic",
        arw: "Arawak",
        ary: "Moroccan Arabic",
        arz: "Egyptian Arabic",
        as: "Assamese",
        asa: "Asu",
        ase: "American Sign Language",
        ast: "Asturian",
        av: "Avaric",
        avk: "Kotava",
        awa: "Awadhi",
        ay: "Aymara",
        az: "Azerbaijani",
        az_Cyrl: "Azerbaijani (Cyrillic)",
        az_Latn: "Azerbaijani (Latin)",
        ba: "Bashkir",
        bal: "Baluchi",
        ban: "Balinese",
        bar: "Bavarian",
        bas: "Basaa",
        bax: "Bamun",
        bbc: "Batak Toba",
        bbj: "Ghomala",
        be: "Belarusian",
        bej: "Beja",
        bem: "Bemba",
        bew: "Betawi",
        bez: "Bena",
        bfd: "Bafut",
        bfq: "Badaga",
        bg: "Bulgarian",
        bgc: "Haryanvi",
        bgn: "Western Balochi",
        bho: "Bhojpuri",
        bi: "Bislama",
        bik: "Bikol",
        bin: "Bini",
        bjn: "Banjar",
        bkm: "Kom",
        bla: "Siksik\u00e1",
        blo: "Anii",
        bm: "Bambara",
        bn: "Bangla",
        bo: "Tibetan",
        bpy: "Bishnupriya",
        bqi: "Bakhtiari",
        br: "Breton",
        bra: "Braj",
        brh: "Brahui",
        brx: "Bodo",
        bs: "Bosnian",
        bs_Cyrl: "Bosnian (Cyrillic)",
        bs_Latn: "Bosnian (Latin)",
        bss: "Akoose",
        bua: "Buriat",
        bug: "Buginese",
        bum: "Bulu",
        byn: "Blin",
        byv: "Medumba",
        ca: "Catalan",
        cad: "Caddo",
        car: "Carib",
        cay: "Cayuga",
        cch: "Atsam",
        ccp: "Chakma",
        ce: "Chechen",
        ceb: "Cebuano",
        cgg: "Chiga",
        ch: "Chamorro",
        chb: "Chibcha",
        chg: "Chagatai",
        chk: "Chuukese",
        chm: "Mari",
        chn: "Chinook Jargon",
        cho: "Choctaw",
        chp: "Chipewyan",
        chr: "Cherokee",
        chy: "Cheyenne",
        ckb: "Central Kurdish",
        co: "Corsican",
        cop: "Coptic",
        cps: "Capiznon",
        cr: "Cree",
        crh: "Crimean Tatar",
        cs: "Czech",
        csb: "Kashubian",
        csw: "Swampy Cree",
        cu: "Church Slavic",
        cv: "Chuvash",
        cy: "Welsh",
        da: "Danish",
        dak: "Dakota",
        dar: "Dargwa",
        dav: "Taita",
        de: "German",
        de_AT: "German (Austria)",
        de_CH: "German (Switzerland)",
        del: "Delaware",
        den: "Slave",
        dgr: "Dogrib",
        din: "Dinka",
        dje: "Zarma",
        doi: "Dogri",
        dsb: "Lower Sorbian",
        dua: "Duala",
        dum: "Middle Dutch",
        dv: "Divehi",
        dyo: "Jola-Fonyi",
        dyu: "Dyula",
        dz: "Dzongkha",
        dzg: "Dazaga",
        ebu: "Embu",
        ee: "Ewe",
        efi: "Efik",
        egy: "Ancient Egyptian",
        eka: "Ekajuk",
        el: "Greek",
        elx: "Elamite",
        en: "English",
        en_AU: "English (Australia)",
        en_CA: "English (Canada)",
        en_GB: "English (United Kingdom)",
        en_US: "English (United States)",
        enm: "Middle English",
        eo: "Esperanto",
        es: "Spanish",
        es_419: "Spanish (Latin America)",
        es_ES: "Spanish (Spain)",
        es_MX: "Spanish (Mexico)",
        et: "Estonian",
        eu: "Basque",
        ewo: "Ewondo",
        fa: "Persian",
        fa_AF: "Persian (Afghanistan)",
        fan: "Fang",
        fat: "Fanti",
        ff: "Fula",
        ff_Adlm: "Fula (Adlam)",
        ff_Latn: "Fula (Latin)",
        fi: "Finnish",
        fil: "Filipino",
        fj: "Fijian",
        fo: "Faroese",
        fon: "Fon",
        fr: "French",
        fr_CA: "French (Canada)",
        fr_CH: "French (Switzerland)",
        frm: "Middle French",
        fro: "Old French",
        frr: "Northern Frisian",
        frs: "Eastern Frisian",
        fur: "Friulian",
        fy: "Western Frisian",
        ga: "Irish",
        gaa: "Ga",
        gay: "Gayo",
        gba: "Gbaya",
        gd: "Scottish Gaelic",
        gez: "Geez",
        gil: "Gilbertese",
        gl: "Galician",
        gmh: "Middle High German",
        gn: "Guarani",
        goh: "Old High German",
        gon: "Gondi",
        gor: "Gorontalo",
        got: "Gothic",
        grb: "Grebo",
        grc: "Ancient Greek",
        gsw: "Swiss German",
        gu: "Gujarati",
        guz: "Gusii",
        gv: "Manx",
        gwi: "Gwich\u02bcin",
        ha: "Hausa",
        hai: "Haida",
        haw: "Hawaiian",
        he: "Hebrew",
        hi: "Hindi",
        hi_Latn: "Hindi (Latin)",
        hil: "Hiligaynon",
        hit: "Hittite",
        hmn: "Hmong",
        ho: "Hiri Motu",
        hr: "Croatian",
        hsb: "Upper Sorbian",
        ht: "Haitian Creole",
        hu: "Hungarian",
        hup: "Hupa",
        hy: "Armenian",
        hz: "Herero",
        ia: "Interlingua",
        iba: "Iban",
        ibb: "Ibibio",
        id: "Indonesian",
        ie: "Interlingue",
        ig: "Igbo",
        ii: "Sichuan Yi",
        ik: "Inupiaq",
        ilo: "Iloko",
        "in": "Indonesian",
        inh: "Ingush",
        io: "Ido",
        is: "Icelandic",
        it: "Italian",
        iu: "Inuktitut",
        iw: "Hebrew",
        ja: "Japanese",
        jbo: "Lojban",
        jgo: "Ngomba",
        jmc: "Machame",
        jpr: "Judeo-Persian",
        jrb: "Judeo-Arabic",
        jv: "Javanese",
        ka: "Georgian",
        kaa: "Kara-Kalpak",
        kab: "Kabyle",
        kac: "Kachin",
        kaj: "Jju",
        kam: "Kamba",
        kaw: "Kawi",
        kbd: "Kabardian",
        kbl: "Kanembu",
        kcg: "Tyap",
        kde: "Makonde",
        kea: "Kabuverdianu",
        kfo: "Koro",
        kg: "Kongo",
        kgp: "Kaingang",
        kha: "Khasi",
        kho: "Khotanese",
        khq: "Koyra Chiini",
        ki: "Kikuyu",
        kj: "Kuanyama",
        kk: "Kazakh",
        kk_Cyrl: "Kazakh (Cyrillic)",
        kkj: "Kako",
        kl: "Kalaallisut",
        kln: "Kalenjin",
        km: "Khmer",
        kmb: "Kimbundu",
        kn: "Kannada",
        ko: "Korean",
        kok: "Konkani",
        kok_Deva: "Konkani (Devanagari)",
        kok_Latn: "Konkani (Latin)",
        kos: "Kosraean",
        kpe: "Kpelle",
        kr: "Kanuri",
        krc: "Karachay-Balkar",
        krl: "Karelian",
        kru: "Kurukh",
        ks: "Kashmiri",
        ks_Arab: "Kashmiri (Arabic)",
        ks_Deva: "Kashmiri (Devanagari)",
        ksb: "Shambala",
        ksf: "Bafia",
        ksh: "Colognian",
        ku: "Kurdish",
        kum: "Kumyk",
        kut: "Kutenai",
        kv: "Komi",
        kw: "Cornish",
        kxv: "Kuvi",
        kxv_Deva: "Kuvi (Devanagari)",
        kxv_Latn: "Kuvi (Latin)",
        kxv_Orya: "Kuvi (Odia)",
        kxv_Telu: "Kuvi (Telugu)",
        ky: "Kyrgyz",
        la: "Latin",
        lad: "Ladino",
        lag: "Langi",
        lah: "Western Panjabi",
        lam: "Lamba",
        lb: "Luxembourgish",
        lez: "Lezghian",
        lg: "Ganda",
        li: "Limburgish",
        lij: "Ligurian",
        lkt: "Lakota",
        lmo: "Lombard",
        ln: "Lingala",
        lo: "Lao",
        lol: "Mongo",
        loz: "Lozi",
        lrc: "Northern Luri",
        lt: "Lithuanian",
        lu: "Luba-Katanga",
        lua: "Luba-Lulua",
        lui: "Luiseno",
        lun: "Lunda",
        luo: "Luo",
        lus: "Mizo",
        luy: "Luyia",
        lv: "Latvian",
        mad: "Madurese",
        maf: "Mafa",
        mag: "Magahi",
        mai: "Maithili",
        mak: "Makasar",
        man: "Mandingo",
        mas: "Masai",
        mde: "Maba",
        mdf: "Moksha",
        mdr: "Mandar",
        men: "Mende",
        mer: "Meru",
        mfe: "Morisyen",
        mg: "Malagasy",
        mga: "Middle Irish",
        mgh: "Makhuwa-Meetto",
        mgo: "Meta\u02bc",
        mh: "Marshallese",
        mi: "M\u0101ori",
        mic: "Mi'kmaw",
        min: "Minangkabau",
        mk: "Macedonian",
        ml: "Malayalam",
        mn: "Mongolian",
        mnc: "Manchu",
        mni: "Manipuri",
        mni_Beng: "Manipuri (Bangla)",
        mo: "Romanian",
        moh: "Mohawk",
        mos: "Mossi",
        mr: "Marathi",
        ms: "Malay",
        mt: "Maltese",
        mua: "Mundang",
        mul: "Multiple languages",
        mus: "Muscogee",
        mwl: "Mirandese",
        mwr: "Marwari",
        my: "Burmese",
        mye: "Myene",
        myv: "Erzya",
        mzn: "Mazanderani",
        na: "Nauru",
        nap: "Neapolitan",
        naq: "Nama",
        nb: "Norwegian Bokm\u00e5l",
        nd: "North Ndebele",
        nds: "Low German",
        nds_NL: "Low German (Netherlands)",
        ne: "Nepali",
        "new": "Newari",
        ng: "Ndonga",
        nia: "Nias",
        niu: "Niuean",
        nl: "Dutch",
        nl_BE: "Dutch (Belgium)",
        nmg: "Kwasio",
        nn: "Norwegian Nynorsk",
        nnh: "Ngiemboon",
        no: "Norwegian",
        nog: "Nogai",
        non: "Old Norse",
        nqo: "N\u2019Ko",
        nr: "South Ndebele",
        nso: "Northern Sotho",
        nus: "Nuer",
        nv: "Navajo",
        nwc: "Classical Newari",
        ny: "Nyanja",
        nym: "Nyamwezi",
        nyn: "Nyankole",
        nyo: "Nyoro",
        nzi: "Nzima",
        oc: "Occitan",
        oj: "Ojibwa",
        om: "Oromo",
        or: "Odia",
        os: "Ossetic",
        osa: "Osage",
        ota: "Ottoman Turkish",
        pa: "Punjabi",
        pa_Arab: "Punjabi (Arabic)",
        pa_Guru: "Punjabi (Gurmukhi)",
        pag: "Pangasinan",
        pal: "Pahlavi",
        pam: "Pampanga",
        pap: "Papiamento",
        pau: "Palauan",
        pcm: "Nigerian Pidgin",
        peo: "Old Persian",
        phn: "Phoenician",
        pi: "Pali",
        pl: "Polish",
        pon: "Pohnpeian",
        prg: "Prussian",
        pro: "Old Proven\u00e7al",
        ps: "Pashto",
        pt: "Portuguese",
        pt_BR: "Portuguese (Brazil)",
        pt_PT: "Portuguese (Portugal)",
        qu: "Quechua",
        raj: "Rajasthani",
        rap: "Rapanui",
        rar: "Rarotongan",
        rm: "Romansh",
        rn: "Rundi",
        ro: "Romanian",
        ro_MD: "Romanian (Moldova)",
        rof: "Rombo",
        rom: "Romany",
        ru: "Russian",
        rup: "Aromanian",
        rw: "Kinyarwanda",
        rwk: "Rwa",
        sa: "Sanskrit",
        sad: "Sandawe",
        sah: "Yakut",
        sam: "Samaritan Aramaic",
        saq: "Samburu",
        sas: "Sasak",
        sat: "Santali",
        sat_Olck: "Santali (Ol Chiki)",
        sba: "Ngambay",
        sbp: "Sangu",
        sc: "Sardinian",
        scn: "Sicilian",
        sco: "Scots",
        sd: "Sindhi",
        sd_Arab: "Sindhi (Arabic)",
        sd_Deva: "Sindhi (Devanagari)",
        se: "Northern Sami",
        see: "Seneca",
        seh: "Sena",
        sel: "Selkup",
        ses: "Koyraboro Senni",
        sg: "Sango",
        sga: "Old Irish",
        sh: "Serbo-Croatian",
        shi: "Tachelhit",
        shi_Latn: "Tachelhit (Latin)",
        shi_Tfng: "Tachelhit (Tifinagh)",
        shn: "Shan",
        shu: "Chadian Arabic",
        si: "Sinhala",
        sid: "Sidamo",
        sk: "Slovak",
        sl: "Slovenian",
        sm: "Samoan",
        sma: "Southern Sami",
        smj: "Lule Sami",
        smn: "Inari Sami",
        sms: "Skolt Sami",
        sn: "Shona",
        snk: "Soninke",
        so: "Somali",
        sog: "Sogdien",
        sq: "Albanian",
        sr: "Serbian",
        sr_Cyrl: "Serbian (Cyrillic)",
        sr_Latn: "Serbian (Latin)",
        srn: "Sranan Tongo",
        srr: "Serer",
        ss: "Swati",
        ssy: "Saho",
        st: "Southern Sotho",
        su: "Sundanese",
        su_Latn: "Sundanese (Latin)",
        suk: "Sukuma",
        sus: "Susu",
        sux: "Sumerian",
        sv: "Swedish",
        sw: "Swahili",
        sw_CD: "Swahili (Congo - Kinshasa)",
        swb: "Comorian",
        syc: "Classical Syriac",
        syr: "Syriac",
        szl: "Silesian",
        ta: "Tamil",
        te: "Telugu",
        tem: "Timne",
        teo: "Teso",
        ter: "Tereno",
        tet: "Tetum",
        tg: "Tajik",
        th: "Thai",
        ti: "Tigrinya",
        tig: "Tigre",
        tiv: "Tiv",
        tk: "Turkmen",
        tkl: "Tokelau",
        tl: "Tagalog",
        tlh: "Klingon",
        tli: "Tlingit",
        tmh: "Tamashek",
        tn: "Tswana",
        to: "Tongan",
        tog: "Nyasa Tonga",
        tok: "Toki Pona",
        tpi: "Tok Pisin",
        tr: "Turkish",
        trv: "Taroko",
        ts: "Tsonga",
        tsi: "Tsimshian",
        tt: "Tatar",
        tum: "Tumbuka",
        tvl: "Tuvalu",
        tw: "Twi",
        twq: "Tasawaq",
        ty: "Tahitian",
        tyv: "Tuvinian",
        tzm: "Central Atlas Tamazight",
        udm: "Udmurt",
        ug: "Uyghur",
        uga: "Ugaritic",
        uk: "Ukrainian",
        umb: "Umbundu",
        ur: "Urdu",
        uz: "Uzbek",
        uz_Arab: "Uzbek (Arabic)",
        uz_Cyrl: "Uzbek (Cyrillic)",
        uz_Latn: "Uzbek (Latin)",
        vai: "Vai",
        vai_Latn: "Vai (Latin)",
        vai_Vaii: "Vai (Vai)",
        ve: "Venda",
        vec: "Venetian",
        vi: "Vietnamese",
        vmw: "Makhuwa",
        vo: "Volap\u00fck",
        vot: "Votic",
        vun: "Vunjo",
        wa: "Walloon",
        wae: "Walser",
        wal: "Wolaytta",
        war: "Waray",
        was: "Washo",
        wo: "Wolof",
        xal: "Kalmyk",
        xh: "Xhosa",
        xnr: "Kangri",
        xog: "Soga",
        yao: "Yao",
        yap: "Yapese",
        yav: "Yangben",
        ybb: "Yemba",
        yi: "Yiddish",
        yo: "Yoruba",
        yrl: "Nheengatu",
        yue: "Cantonese",
        yue_Hans: "Cantonese (Simplified)",
        yue_Hant: "Cantonese (Traditional)",
        za: "Zhuang",
        zap: "Zapotec",
        zbl: "Blissymbols",
        zen: "Zenaga",
        zgh: "Standard Moroccan Tamazight",
        zh: "Chinese",
        zh_Hans: "Chinese (Simplified)",
        zh_Hant: "Chinese (Traditional)",
        zh_TW: "Chinese (Taiwan)",
        zu: "Zulu",
        zun: "Zuni",
        zxx: "No linguistic content",
        zza: "Zaza"
    };
    hs.prototype.contains = function(p) {
        p = g.Xv(this.segments, p);
        return p >= 0 || p < 0 && (-p - 1) % 2 === 1
    }
    ;
    hs.prototype.length = function() {
        return this.segments.length / 2
    }
    ;
    g.m(r9r, g.Y);
    g.h = r9r.prototype;
    g.h.CS = function() {
        g.Y.prototype.CS.call(this);
        this.V && this.V.cancel()
    }
    ;
    g.h.M$ = function() {
        this.seekTo(this.player.getCurrentTime())
    }
    ;
    g.h.seekTo = function(p) {
        p -= this.player.yZ();
        var C = this.T;
        this.T = g.wY(this.a$.V8(p).wV);
        C !== this.T && this.Z && this.Z()
    }
    ;
    g.h.reset = function() {
        this.S = new hs;
        this.Y = -1;
        this.V && (this.V.cancel(),
        this.V = null)
    }
    ;
    g.h.Nj = function() {
        this.fS();
        var p;
        if (p = this.T != null)
            p = this.T,
            p = p.T.pw(p);
        if (p && !this.V && !(this.T && this.T.startTime - this.player.getCurrentTime() > 30)) {
            p = this.T;
            p = p.T.Jm(p);
            var C = p.wV[0], V;
            if ((V = this.player.getVideoData()) == null ? 0 : V.enableServerStitchedDai)
                if (V = this.player.dH()) {
                    var N = C.T.info.id
                      , H = C.LS
                      , X = p.wV[0].Qi;
                    if (this.policy.vr) {
                        if (V = V.i5(X, H, N, 3))
                            p.S = V
                    } else if (N = V.UI(X, H, N, 3))
                        if (V = V.FZ(H),
                        V === 0)
                            N && (p.T = new g.v1(N));
                        else if (V === 2) {
                            this.D.start();
                            BI8(this) && this.seekTo(this.player.getCurrentTime());
                            return
                        }
                }
            C.T.index.fk(C.LS) ? (this.S.contains(p.wV[0].LS) || Ghc(this, p),
            this.T = g.wY(p.wV)) : BI8(this) && this.seekTo(this.player.getCurrentTime())
        }
        this.D.start()
    }
    ;
    g.m(sb, g.Ar);
    g.h = sb.prototype;
    g.h.HS = function(p, C, V) {
        var N = this;
        this.MX();
        C = jN8(this, p.getId());
        C || (C = p.languageCode,
        C = this.C.isManifestless ? Vup(this, C, "386") : Vup(this, C));
        if (C) {
            var H = (C.index.ma(C.index.V6()) - C.index.getStartTime(C.index.V6())) * 1E3
              , X = this.N.K()
              , d = new g.YWu(X)
              , a = function() {
                N.V && N.V.reset();
                N.Y = !0
            };
            X.G("html5_keep_caption_data_after_seek") && (a = null);
            this.V = new r9r(d,this.N,C,function(E, l) {
                V.b3(E, p, l, H)
            }
            ,this.D || g.Cx(C.info),a)
        }
    }
    ;
    g.h.H2 = function() {
        var p = this.Y;
        this.Y = !1;
        return p
    }
    ;
    g.h.Jr = function(p) {
        var C = this.D ? [new g.is({
            id: "rawcc",
            languageCode: "rawcc",
            languageName: "CC1",
            is_servable: !0,
            is_default: !0,
            is_translateable: !1,
            vss_id: ".en"
        }), new g.is({
            id: "rawcc",
            languageCode: "rawcc",
            languageName: "CC3",
            is_servable: !0,
            is_default: !0,
            is_translateable: !1,
            vss_id: ".en"
        })] : this.C.isManifestless ? CKy(this, "386") : CKy(this);
        C = g.F(C);
        for (var V = C.next(); !V.done; V = C.next())
            g.bi(this.T, V.value);
        p.m$()
    }
    ;
    g.h.MX = function() {
        this.V && (this.V.dispose(),
        this.V = null)
    }
    ;
    g.h.Es = function() {
        return ""
    }
    ;
    g.h.lN = function() {
        this.V && (this.V.reset(),
        this.N.qt("captions"))
    }
    ;
    var f9 = /^#(?:[0-9a-f]{3}){1,2}$/i;
    var Xe8 = ["left", "right", "center", "justify"];
    g.m(an, g.L);
    g.h = an.prototype;
    g.h.IS = function(p, C) {
        this.KS = p;
        this.Qn = C;
        var V = g.I9(this.element, this.element.parentElement);
        this.qo = p - V.x;
        this.X$ = C - V.y
    }
    ;
    g.h.sF = function(p, C) {
        if (p !== this.KS || C !== this.Qn) {
            g.aL(this.element, "ytp-dragging") || g.Ed(this.element, "ytp-dragging");
            var V = g.Ax(this.element);
            p = p - this.qo - .02 * this.playerWidth;
            var N = C - this.X$ - .02 * this.playerHeight
              , H = (p + V.width / 2) / this.maxWidth * 3;
            H = Math.floor(g.J9(H, 0, 2));
            var X = (N + V.height / 2) / this.maxHeight * 3;
            X = Math.floor(g.J9(X, 0, 2));
            C = H + X * 3;
            p = (p + H / 2 * V.width) / this.maxWidth;
            p = g.J9(p, 0, 1) * 100;
            V = (N + X / 2 * V.height) / this.maxHeight;
            V = g.J9(V, 0, 1) * 100;
            this.C.params.Qv = C;
            this.C.params.qX = V;
            this.C.params.Ev = p;
            this.C.params.isDefault = !1;
            this.T.Qv = C;
            this.T.qX = V;
            this.T.Ev = p;
            this.T.isDefault = !1;
            this.b_.Qv = C;
            this.b_.qX = V;
            this.b_.Ev = p;
            this.b_.isDefault = !1;
            this.eW()
        }
    }
    ;
    g.h.xO = function() {
        g.tk(this.element, "ytp-dragging")
    }
    ;
    g.h.eW = function() {
        this.lC(this.D)
    }
    ;
    g.h.getType = function() {
        return this.type
    }
    ;
    g.h.lC = function(p) {
        var C = this.kM ? 0 : Math.min(this.Y4(), this.maxWidth)
          , V = this.Ru()
          , N = this.kM;
        if (N) {
            var H = getComputedStyle(this.S.parentNode);
            H = Eb(H.borderLeftWidth) + Eb(H.borderRightWidth) + Eb(H.paddingLeft) + Eb(H.paddingRight)
        } else
            H = 0;
        var X = H;
        H = "";
        this.C.params.v$ === 3 && (H = "rotate(180deg)");
        var d = N ? "calc(96% - " + X + "px)" : "96%";
        g.K2(this.element, {
            top: 0,
            left: 0,
            right: "",
            bottom: "",
            width: C ? C + "px" : "",
            height: V ? V + "px" : "",
            "max-width": d,
            "max-height": d,
            margin: "",
            transform: ""
        });
        this.z9(p);
        H = {
            transform: H,
            top: "",
            left: "",
            width: C ? C + "px" : "",
            height: V ? V + "px" : "",
            "max-width": "",
            "max-height": ""
        };
        var a = this.T.Ev * .96 + 2;
        d = this.T.Qv;
        switch (d) {
        case 0:
        case 3:
        case 6:
            (N = this.T.yL.fontSizeIncrement) && N > 0 && this.T.v$ !== 2 && this.T.v$ !== 3 && (a = Math.max(a / (1 + N * 2), 2));
            H.left = a + "%";
            break;
        case 1:
        case 4:
        case 7:
            H.left = a + "%";
            a = this.S.offsetWidth;
            C || a ? (C = C || a + 1,
            H.width = C + "px",
            H["margin-left"] = N ? C / -2 - X / 2 + "px" : C / -2 + "px") : H.transform += " translateX(-50%)";
            break;
        case 2:
        case 5:
        case 8:
            H.right = 100 - a + "%"
        }
        N = this.T.qX * .96 + 2;
        switch (d) {
        case 0:
        case 1:
        case 2:
            H.top = N + "%";
            break;
        case 3:
        case 4:
        case 5:
            H.top = N + "%";
            (V = V || this.element.clientHeight) ? (H.height = V + "px",
            H["margin-top"] = V / -2 + "px") : H.transform += " translateY(-50%)";
            break;
        case 6:
        case 7:
        case 8:
            H.bottom = 100 - N + "%"
        }
        g.K2(this.element, H);
        if (this.W) {
            V = this.S.offsetHeight;
            N = 1;
            for (C = 0; C < p.length; C++)
                H = p[C],
                typeof H.text === "string" && (N += H.text.split("\n").length - 1,
                H.append || C === 0 || N++);
            V /= N;
            this.W.style.height = V + "px";
            this.W.style.width = V + "px";
            this.element.style.paddingLeft = V + 5 + "px";
            this.element.style.paddingRight = V + 5 + "px";
            p = Number(this.element.style.marginLeft.replace("px", "")) - V - 5;
            V = Number(this.element.style.marginRight.replace("px", "")) - V - 5;
            this.element.style.marginLeft = p + "px";
            this.element.style.marginRight = V + "px"
        }
    }
    ;
    g.h.z9 = function(p) {
        var C;
        for (C = 0; C < p.length && p[C] === this.D[C]; C++)
            ;
        if (this.Sa || this.D.length > C)
            C = 0,
            this.Sa = !1,
            this.D = [],
            this.J = this.vr = this.Wr = null,
            g.aN(this.S);
        for (; C < p.length; C++)
            azF(this, p[C])
    }
    ;
    g.h.Y4 = function() {
        return 0
    }
    ;
    g.h.Ru = function() {
        return 0
    }
    ;
    g.h.toString = function() {
        return g.L.prototype.toString.call(this)
    }
    ;
    lzp.prototype.clear = function() {
        this.V = this.time = this.mode = 0;
        this.T = [];
        this.reset()
    }
    ;
    lzp.prototype.reset = function() {
        this.mode = 0;
        this.S.reset(0);
        this.W.reset(1)
    }
    ;
    var tuv = [128, 1, 2, 131, 4, 133, 134, 7, 8, 137, 138, 11, 140, 13, 14, 143, 16, 145, 146, 19, 148, 21, 22, 151, 152, 25, 26, 155, 28, 157, 158, 31, 32, 161, 162, 35, 164, 37, 38, 167, 168, 41, 42, 171, 44, 173, 174, 47, 176, 49, 50, 179, 52, 181, 182, 55, 56, 185, 186, 59, 188, 61, 62, 191, 64, 193, 194, 67, 196, 69, 70, 199, 200, 73, 74, 203, 76, 205, 206, 79, 208, 81, 82, 211, 84, 213, 214, 87, 88, 217, 218, 91, 220, 93, 94, 223, 224, 97, 98, 227, 100, 229, 230, 103, 104, 233, 234, 107, 236, 109, 110, 239, 112, 241, 242, 115, 244, 117, 118, 247, 248, 121, 122, 251, 124, 253, 254, 127, 0, 129, 130, 3, 132, 5, 6, 135, 136, 9, 10, 139, 12, 141, 142, 15, 144, 17, 18, 147, 20, 149, 150, 23, 24, 153, 154, 27, 156, 29, 30, 159, 160, 33, 34, 163, 36, 165, 166, 39, 40, 169, 170, 43, 172, 45, 46, 175, 48, 177, 178, 51, 180, 53, 54, 183, 184, 57, 58, 187, 60, 189, 190, 63, 192, 65, 66, 195, 68, 197, 198, 71, 72, 201, 202, 75, 204, 77, 78, 207, 80, 209, 210, 83, 212, 85, 86, 215, 216, 89, 90, 219, 92, 221, 222, 95, 96, 225, 226, 99, 228, 101, 102, 231, 232, 105, 106, 235, 108, 237, 238, 111, 240, 113, 114, 243, 116, 245, 246, 119, 120, 249, 250, 123, 252, 125, 126, 255];
    lJ.prototype.set = function(p) {
        this.type = p
    }
    ;
    lJ.prototype.get = function() {
        return this.type
    }
    ;
    ts.prototype.clear = function() {
        this.state = 0
    }
    ;
    ts.prototype.update = function() {
        this.state = this.state === 2 ? 1 : 0
    }
    ;
    ts.prototype.GN = function() {
        return this.state !== 0
    }
    ;
    ts.prototype.matches = function(p, C) {
        return this.GN() && p === this.Gs && C === this.t2
    }
    ;
    mq2.prototype.reset = function() {
        this.timestamp = this.T = 0
    }
    ;
    cM.prototype.updateTime = function(p) {
        for (var C = 1; C <= 15; ++C)
            for (var V = 1; V <= 32; ++V)
                this.V[C][V].timestamp = p
    }
    ;
    cM.prototype.debugString = function() {
        for (var p = "\n", C = 1; C <= 15; ++C) {
            for (var V = 1; V <= 32; ++V) {
                var N = this.V[C][V];
                p = N.T === 0 ? p + "_" : p + String.fromCharCode(N.T)
            }
            p += "\n"
        }
        return p
    }
    ;
    cM.prototype.reset = function(p) {
        for (var C = 0; C <= 15; C++)
            for (var V = 0; V <= 32; V++)
                this.V[C][V].reset();
        this.S = p;
        this.T = 0;
        this.C = this.row = 1
    }
    ;
    var vq0 = [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 225, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 233, 93, 237, 243, 250, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 231, 247, 209, 241, 9632]
      , FS2 = [174, 176, 189, 191, 8482, 162, 163, 9834, 224, 32, 232, 226, 234, 238, 244, 251]
      , Sor = [193, 201, 211, 218, 220, 252, 8216, 161, 42, 39, 9473, 169, 8480, 183, 8220, 8221, 192, 194, 199, 200, 202, 203, 235, 206, 207, 239, 212, 217, 249, 219, 171, 187]
      , KSv = [195, 227, 205, 204, 236, 210, 242, 213, 245, 123, 125, 92, 94, 95, 124, 126, 196, 228, 214, 246, 223, 165, 164, 9475, 197, 229, 216, 248, 9487, 9491, 9495, 9499];
    Uqf.prototype.reset = function(p, C) {
        this.W = C;
        this.style.set(2);
        this.C = this.Y;
        this.S = this.D;
        this.T = this.C;
        var V = (p << 2) + (C << 1);
        this.Y.reset(V);
        this.D.reset(V);
        this.text.reset((p << 2) + (C << 1) + 1)
    }
    ;
    EqG.prototype.reset = function(p) {
        this.W = p;
        this.C.clear();
        this.S = this.V;
        this.V.reset(p, 0);
        this.Y.reset(p, 1)
    }
    ;
    qo2.prototype.S = function() {}
    ;
    g.m(vM, g.sz);
    vM.prototype.toString = function() {
        return g.sz.prototype.toString.call(this)
    }
    ;
    g.m(FS, g.Y);
    FS.prototype.lX = function() {
        return []
    }
    ;
    FS.prototype.reset = function() {}
    ;
    g.m(S$, g.sz);
    S$.prototype.toString = function() {
        return g.sz.prototype.toString.call(this)
    }
    ;
    var K9 = 0;
    g.m(DI, FS);
    DI.prototype.reset = function() {
        this.Y = {};
        this.C = this.T = null;
        this.W = !0
    }
    ;
    DI.prototype.lX = function(p, C) {
        p = p.firstChild;
        p.getAttribute("format");
        C = C || 0;
        Number.isFinite(C);
        p = Array.from(p.childNodes);
        p = g.F(p);
        for (var V = p.next(); !V.done; V = p.next())
            if (V = V.value,
            V.nodeType === 1)
                switch (V.tagName) {
                case "head":
                    var N = V;
                    break;
                case "body":
                    var H = V
                }
        if (N)
            for (N = Array.from(N.childNodes),
            N = g.F(N),
            p = N.next(); !p.done; p = N.next())
                if (p = p.value,
                p.nodeType === 1)
                    switch (p.tagName) {
                    case "pen":
                        V = p.getAttribute("id");
                        var X = this.pens
                          , d = {}
                          , a = p.getAttribute("p");
                        a && Object.assign(d, this.pens[a]);
                        a = ZI(p, "b");
                        a != null && (d.bold = a);
                        a = ZI(p, "i");
                        a != null && (d.italic = a);
                        a = ZI(p, "u");
                        a != null && (d.underline = a);
                        a = Ub(p, "et");
                        a != null && (d.charEdgeStyle = a);
                        a = Ub(p, "of");
                        a != null && (d.offset = a);
                        a = Ob(p, "bc");
                        a != null && (d.background = a);
                        a = Ob(p, "ec");
                        a != null && (d.O9 = a);
                        a = Ob(p, "fc");
                        a != null && (d.color = a);
                        a = Ub(p, "fs");
                        a != null && a !== 0 && (d.fontFamily = a);
                        a = uJ(p, "sz");
                        a !== void 0 && (d.fontSizeIncrement = a / 100 - 1);
                        a = uJ(p, "bo");
                        a !== void 0 && (d.backgroundOpacity = a / 255);
                        a = uJ(p, "fo");
                        a !== void 0 && (d.textOpacity = a / 255);
                        a = Ub(p, "rb");
                        a != null && a !== 10 && a !== 0 && (d.kB = a > 10 ? a - 1 : a);
                        p = Ub(p, "hg");
                        p != null && (d.R4 = p);
                        X[V] = d;
                        break;
                    case "ws":
                        V = p.getAttribute("id");
                        this.J[V] = oqv(this, p);
                        break;
                    case "wp":
                        V = p.getAttribute("id"),
                        this.D[V] = kOc(this, p)
                    }
        if (H) {
            N = [];
            H = Array.from(H.childNodes);
            H = g.F(H);
            for (p = H.next(); !p.done; p = H.next())
                if (p = p.value,
                p.nodeType === 1)
                    switch (p.tagName) {
                    case "w":
                        this.T = xqf(this, p, C, !1);
                        (p = this.Y[this.T.id]) && p.end > this.T.start && (p.end = this.T.start);
                        this.Y[this.T.id] = this.T;
                        N.push(this.T);
                        break;
                    case "p":
                        var E = p;
                        a = C;
                        V = [];
                        X = E.getAttribute("w") || this.S;
                        d = !!ZI(E, "a");
                        a = (uJ(E, "t") || 0) + a;
                        var l = uJ(E, "d") || 5E3;
                        d || (!this.W && this.C && this.C.windowId === X && this.C.end > a && (this.C.end = a),
                        this.C && this.C.text === "\n" && (this.C.text = ""));
                        var t = d ? 6 : 5
                          , c = E.getAttribute("p");
                        c = c ? this.pens[c] : null;
                        var T = Array.from(E.childNodes);
                        T.length && (this.W = E.getAttribute("d") != null);
                        for (E = 0; E < T.length; E++) {
                            var M = T[E]
                              , J = void 0;
                            E > 0 && (d = !0);
                            var S = void 0;
                            M.nodeType === 1 && (S = M);
                            if (S && S.tagName === "s") {
                                if ((M = (M = S.getAttribute("p")) ? this.pens[M] : null) && M.kB && (M.kB === 1 ? (M = T.slice(E, E + 4),
                                M.length === 4 && (J = beY(a, l, X, d, t, M, this.pens),
                                E += 3)) : J = beY(a, l, X, d, t, [S], this.pens)),
                                !J) {
                                    var D = S;
                                    J = a;
                                    S = l;
                                    M = X;
                                    var Z = d
                                      , f = t
                                      , q = D.textContent ? D.textContent : ""
                                      , A = D.getAttribute("p");
                                    A = A ? this.pens[A] : null;
                                    D = uJ(D, "t") || 0;
                                    J = new vM(J + D,S - D,f,M,q,Z,A)
                                }
                            } else
                                J = new vM(a,l,t,X,M.textContent || "",d,c);
                            V.push(J);
                            this.C = J
                        }
                        if (V.length > 0)
                            for (V[0].windowId === this.S && (this.T = xqf(this, p, C, !0),
                            N.push(this.T)),
                            p = g.F(V),
                            V = p.next(); !V.done; V = p.next())
                                V = V.value,
                                V.windowId = this.T.id,
                                this.T.T.push(V),
                                N.push(V)
                    }
            C = N
        } else
            C = [];
        return C
    }
    ;
    var J88 = new Map([[9, 1], [10, 1], [11, 2], [12, 3], [13, 4], [14, 5]]);
    g.m(ye, FS);
    ye.prototype.reset = function() {
        this.C.clear()
    }
    ;
    ye.prototype.lX = function(p, C) {
        var V = JSON.parse(p);
        if (!V)
            return [];
        if (V.pens) {
            p = 0;
            for (var N = g.F(V.pens), H = N.next(); !H.done; H = N.next()) {
                H = H.value;
                var X = {}
                  , d = H.pParentId;
                d && Object.assign(X, this.T.get(d));
                H.bAttr && (X.bold = !0);
                H.iAttr && (X.italic = !0);
                H.uAttr && (X.underline = !0);
                d = H.ofOffset;
                d != null && (X.offset = d);
                H.szPenSize !== void 0 && (X.fontSizeIncrement = H.szPenSize / 100 - 1);
                d = H.etEdgeType;
                d != null && (X.charEdgeStyle = d);
                H.ecEdgeColor !== void 0 && (X.O9 = q2(H.ecEdgeColor));
                d = H.fsFontStyle;
                d != null && d !== 0 && (X.fontFamily = d);
                H.fcForeColor !== void 0 && (X.color = q2(H.fcForeColor));
                H.foForeAlpha !== void 0 && (X.textOpacity = H.foForeAlpha / 255);
                H.bcBackColor !== void 0 && (X.background = q2(H.bcBackColor));
                H.boBackAlpha !== void 0 && (X.backgroundOpacity = H.boBackAlpha / 255);
                (d = H.rbRuby) && d !== 10 && (X.kB = d > 10 ? d - 1 : d,
                X.XN = J88.get(X.kB));
                H.hgHorizGroup && (X.R4 = H.hgHorizGroup);
                this.T.set(p++, X)
            }
        }
        if (V.wsWinStyles)
            for (p = 0,
            N = g.F(V.wsWinStyles),
            H = N.next(); !H.done; H = N.next())
                H = H.value,
                X = {},
                (d = H.wsParentId) ? Object.assign(X, this.S.get(d)) : Object.assign(X, this.W),
                H.mhModeHint !== void 0 && (X.JS = H.mhModeHint),
                H.juJustifCode !== void 0 && (X.textAlign = H.juJustifCode),
                H.pdPrintDir !== void 0 && (X.v$ = H.pdPrintDir),
                H.sdScrollDir !== void 0 && (X.M_ = H.sdScrollDir),
                H.wfcWinFillColor !== void 0 && (X.windowColor = q2(H.wfcWinFillColor)),
                H.wfoWinFillAlpha !== void 0 && (X.windowOpacity = H.wfoWinFillAlpha / 255),
                this.S.set(p++, X);
        if (V.wpWinPositions)
            for (p = 0,
            N = g.F(V.wpWinPositions),
            H = N.next(); !H.done; H = N.next())
                H = H.value,
                X = {},
                (d = H.wpParentId) && Object.assign(X, this.V.get(d)),
                H.ahHorPos !== void 0 && (X.Ev = H.ahHorPos),
                H.apPoint !== void 0 && (X.Qv = H.apPoint),
                H.avVerPos !== void 0 && (X.qX = H.avVerPos),
                H.ccCols !== void 0 && (X.l6 = H.ccCols),
                H.rcRows !== void 0 && (X.ZJ = H.rcRows),
                this.V.set(p++, X);
        if (V.events) {
            p = [];
            V = g.F(V.events);
            for (N = V.next(); !N.done; N = V.next()) {
                var a = N.value;
                H = (a.tStartMs || 0) + C;
                X = a.dDurationMs || 0;
                if (a.id)
                    d = String(a.id),
                    N = YoF(this, a, H, X, d),
                    p.push(N),
                    this.C.set(d, N);
                else {
                    a.wWinId ? d = a.wWinId.toString() : (d = "_" + K9++,
                    N = YoF(this, a, H, X, d),
                    p.push(N),
                    this.C.set(d, N));
                    N = p;
                    var E = a;
                    X === 0 && (X = 5E3);
                    a = this.C.get(d);
                    var l = !!E.aAppend
                      , t = l ? 6 : 5
                      , c = E.segs
                      , T = null;
                    E.pPenId && (T = this.T.get(E.pPenId));
                    for (E = 0; E < c.length; E++) {
                        var M = c[E]
                          , J = M.utf8;
                        if (J) {
                            var S = M.tOffsetMs || 0
                              , D = null;
                            M.pPenId && (D = this.T.get(M.pPenId));
                            if ((a.params.JS != null ? a.params.JS : a.T.length > 1 ? 1 : 0) === 2 && l && J === "\n")
                                continue;
                            M = null;
                            var Z = [], f;
                            if (f = D && D.kB === 1) {
                                f = c;
                                var q = E;
                                if (q + 3 >= f.length || !f[q + 1].pPenId || !f[q + 2].pPenId || !f[q + 3].pPenId)
                                    f = !1;
                                else {
                                    var A = f[q + 1].pPenId;
                                    (A = this.T.get(A)) && A.kB && A.kB === 2 ? (A = f[q + 2].pPenId,
                                    A = this.T.get(A),
                                    !A || !A.kB || A.kB < 3 ? f = !1 : (A = f[q + 3].pPenId,
                                    f = (A = this.T.get(A)) && A.kB && A.kB === 2 ? !0 : !1)) : f = !1
                                }
                            }
                            if (f)
                                S = c[E + 1].utf8,
                                M = c[E + 3].utf8,
                                f = c[E + 2].utf8,
                                q = this.T.get(c[E + 2].pPenId),
                                J = Izp(J, S, f, M, q),
                                M = new vM(H,X,t,d,J,l,D),
                                E += 3;
                            else {
                                if (J.indexOf("<") > -1) {
                                    var z = void 0;
                                    Z = D;
                                    f = T;
                                    q = H;
                                    A = X;
                                    var Q = S
                                      , P = t
                                      , VL = l
                                      , au = []
                                      , W = g.rv("<html>" + J + "</html>");
                                    if (!W.getElementsByTagName("parsererror").length && ((z = W.firstChild) == null ? 0 : z.childNodes.length))
                                        for (z = g.F(W.firstChild.childNodes),
                                        W = z.next(); !W.done; W = z.next()) {
                                            W = W.value;
                                            var e = void 0
                                              , B = void 0
                                              , v = (B = (e = W.textContent) == null ? void 0 : e.replace(/\n/g, "")) != null ? B : "";
                                            if (W.nodeType !== 3 || v && v.match(/^ *$/) == null) {
                                                e = {};
                                                Object.assign(e, Z || f);
                                                B = void 0;
                                                switch ((B = W) == null ? void 0 : B.tagName) {
                                                case "b":
                                                    e.bold = !0;
                                                    break;
                                                case "i":
                                                    e.italic = !0;
                                                    break;
                                                case "u":
                                                    e.underline = !0
                                                }
                                                au.push(new vM(q + Q,A - Q,P,a.id,v,VL,e))
                                            }
                                        }
                                    Z = au
                                }
                                Z.length || (Z = [new vM(H + S,X - S,t,a.id,J,l,D || T)])
                            }
                            if (Z.length)
                                for (l = g.F(Z),
                                D = l.next(); !D.done; D = l.next())
                                    D = D.value,
                                    N.push(D),
                                    a.T.push(D);
                            else
                                M && (N.push(M),
                                a.T.push(M))
                        }
                        l = !0
                    }
                }
            }
            C = p
        } else
            C = [];
        return C
    }
    ;
    g.m(In, g.Ar);
    In.prototype.HS = function(p, C, V) {
        PcY(this.videoData.videoId, p.vssId, V.b3)
    }
    ;
    In.prototype.Jr = function(p) {
        if (this.audioTrack)
            for (var C = g.F(this.audioTrack.captionTracks), V = C.next(); !V.done; V = C.next())
                g.bi(this.T, V.value);
        p.m$()
    }
    ;
    g.m(bJ, an);
    bJ.prototype.z9 = function(p) {
        var C = this.C.T;
        an.prototype.z9.call(this, p);
        for (p = p.length; p < C.length; p++) {
            var V = C[p];
            if (X && V.T === H)
                var N = X;
            else {
                N = {};
                Object.assign(N, V.T);
                Object.assign(N, m7F);
                var H = V.T;
                var X = N
            }
            azF(this, V, N)
        }
    }
    ;
    var m7F = {
        dU: !0
    };
    g.m(As, qo2);
    As.prototype.S = function(p, C, V, N, H) {
        if (V < N) {
            var X = "_" + K9++;
            V = V / 1E3 - this.Y;
            N = N / 1E3 - this.Y;
            p = new S$(V,N - V,5,X,{
                textAlign: 0,
                Qv: 0,
                Ev: C * 2.5,
                qX: p * 5.33
            });
            H = new vM(V,N - V,5,X,H);
            this.C.push(p);
            this.C.push(H)
        }
    }
    ;
    g.m(xn, FS);
    xn.prototype.lX = function(p) {
        p = new As(p,p.byteLength,this.C);
        if (zC1(p)) {
            for (; p.byteOffset < p.T.byteLength; )
                for (p.version === 0 ? p.V = kn(p) * (1E3 / 45) : p.version === 1 && (p.V = kn(p) * 4294967296 + kn(p)),
                p.W = on(p); p.W > 0; p.W--) {
                    var C = on(p)
                      , V = on(p)
                      , N = on(p);
                    C & 4 && (C & 3) === this.track && (this.track === 0 || this.track === 1) && (C = this.T,
                    C.T.push({
                        time: p.V,
                        type: this.track,
                        md: V,
                        vl: N,
                        order: C.T.length
                    }))
                }
            J21(this.T, p);
            return p.C
        }
        return []
    }
    ;
    xn.prototype.reset = function() {
        this.T.clear()
    }
    ;
    g.m(Yn, an);
    g.h = Yn.prototype;
    g.h.eW = function() {
        g.XV(this.R$)
    }
    ;
    g.h.qRV = function() {
        g.tk(this.element, "ytp-rollup-mode");
        this.lC(this.YM, !0)
    }
    ;
    g.h.Ru = function() {
        return this.V ? this.a$ : this.Z
    }
    ;
    g.h.Y4 = function() {
        return this.V ? this.Z : this.a$
    }
    ;
    g.h.lC = function(p, C) {
        this.YM = p;
        if (this.C.params.ZJ) {
            for (var V = 0, N = 0; N < this.D.length && V < p.length; N++)
                this.D[N] === p[V] && V++;
            V > 0 && V < p.length && (p = this.D.concat(p.slice(V)));
            this.ER = this.a$;
            this.Z = this.a$ = 0;
            an.prototype.lC.call(this, p);
            PK2(this, C)
        }
        an.prototype.lC.call(this, p)
    }
    ;
    g.m(wey, g.Ar);
    g.h = wey.prototype;
    g.h.HS = function(p, C, V) {
        var N = this;
        this.MX();
        C = gq5(this, p.getId());
        C || (C = p.languageCode,
        C = this.C.isManifestless ? WSF(this, C, "386") : WSF(this, C));
        C && (this.Y = p,
        this.D = C,
        this.V = function(H, X) {
            $qy(N, H, V, X)
        }
        ,
        this.N.addEventListener("sabrCaptionsDataLoaded", this.V),
        this.N.publish("sabrCaptionsTrackChanged", g.VE(C.info, this.C.p4)))
    }
    ;
    g.h.Jr = function(p) {
        var C = this.C.isManifestless ? LSv(this, "386") : LSv(this);
        C = g.F(C);
        for (var V = C.next(); !V.done; V = C.next())
            g.bi(this.T, V.value);
        p.m$()
    }
    ;
    g.h.MX = function() {
        this.V != null && (this.N.removeEventListener("sabrCaptionsDataLoaded", this.V),
        this.V = null);
        this.Y = this.D = null;
        this.N.publish("sabrCaptionsTrackChanged", null)
    }
    ;
    g.h.Es = function() {
        return ""
    }
    ;
    g.h.lN = function() {
        this.N.qt("captions")
    }
    ;
    g.m(zL, FS);
    zL.prototype.lX = function(p, C) {
        var V = [];
        p = p.split(v7y);
        for (var N = 1; N < p.length; N++) {
            var H = p[N]
              , X = C;
            if (H !== "" && !FoP.test(H)) {
                var d = S8c.exec(H);
                if (d && d.length >= 4) {
                    var a = BW8(d[1])
                      , E = BW8(d[2]) - a;
                    a += X;
                    var l = (d = d[3]) ? d.split(" ") : [];
                    d = {};
                    var t = null;
                    var c = "";
                    var T = null
                      , M = "";
                    l = g.F(l);
                    for (var J = l.next(); !J.done; J = l.next())
                        if (J = J.value.split(":"),
                        J.length === 2) {
                            var S = J[1];
                            switch (J[0]) {
                            case "line":
                                J = S.split(",");
                                J[0].endsWith("%") && (t = J[0],
                                d.qX = Number.parseInt(t, 10),
                                J.length === 2 && (c = J[1].trim()));
                                break;
                            case "position":
                                J = S.split(",");
                                T = J[0];
                                d.Ev = Number.parseInt(T, 10);
                                J.length === 2 && (M = J[1].trim());
                                break;
                            case "align":
                                switch (S) {
                                case "start":
                                    d.textAlign = 0;
                                    break;
                                case "middle":
                                    d.textAlign = 2;
                                    break;
                                case "end":
                                    d.textAlign = 1
                                }
                            }
                        }
                    t || c || (c = "end");
                    if (!T)
                        switch (d.textAlign) {
                        case 0:
                            d.Ev = 0;
                            break;
                        case 1:
                            d.Ev = 100;
                            break;
                        case 2:
                            d.Ev = 50
                        }
                    if (d.textAlign != null) {
                        t = 0;
                        switch (c) {
                        case "center":
                            t += 3;
                            break;
                        case "end":
                            t += 6;
                            break;
                        default:
                            t += 0
                        }
                        switch (M) {
                        case "line-left":
                            t += 0;
                            break;
                        case "center":
                            t += 1;
                            break;
                        case "line-right":
                            t += 2;
                            break;
                        default:
                            switch (d.textAlign) {
                            case 0:
                                t += 0;
                                break;
                            case 2:
                                t += 1;
                                break;
                            case 1:
                                t += 2
                            }
                        }
                        c = t < 0 || t > 8 ? 7 : t;
                        d.Qv = c
                    }
                    H = H.substring(S8c.lastIndex).replace(/[\x01-\x09\x0b-\x1f]/g, "");
                    M = d;
                    d = H;
                    H = {};
                    if (d.indexOf("<") < 0 && d.indexOf("&") < 0)
                        X = GOp(a, E, 5, M),
                        E = new vM(a,E,5,X.id,d,!1,g.k5(H) ? void 0 : H),
                        V.push(X),
                        V.push(E),
                        X.T.push(E);
                    else
                        for (c = d.split(Koy),
                        c.length === 1 ? (d = 5,
                        M = GOp(a, E, d, M)) : (t = d = 6,
                        M = Object.assign({
                            l6: 32
                        }, M),
                        M = new S$(a,E,t,"_" + K9++,M)),
                        V.push(M),
                        t = a,
                        T = 0; T < c.length; T++)
                            l = c[T],
                            T % 2 === 0 ? (J = g.rv("<html>" + l + "</html>"),
                            J.getElementsByTagName("parsererror").length ? (S = J.createElement("span"),
                            S.appendChild(J.createTextNode(l))) : S = J.firstChild,
                            r2P(this, t, E - (t - a), d, M, T > 0, S, H, V)) : t = BW8(l) + X
                }
                S8c.lastIndex = 0
            }
        }
        return V
    }
    ;
    var FoP = /^NOTE/
      , v7y = /(?:\r\n|\r|\n){2,}/
      , S8c = RegExp("^((?:[\\d]{2}:)?[\\d]{2}:[\\d]{2}\\.[\\d]{3})[\\t ]+--\x3e[\\t ]+((?:[\\d]{2}:)?[\\d]{2}:[\\d]{2}\\.[\\d]{3})(?:[\\t ]*)(.*)(?:\\r\\n|\\r|\\n)", "gm")
      , Koy = RegExp("<((?:[\\d]{2}:)?[\\d]{2}:[\\d]{2}\\.[\\d]{3})>");
    g.Rv.JR(zL, {
        lX: "wvppt"
    });
    g.m(Rn, g.Y);
    Rn.prototype.lX = function(p, C, V, N) {
        N = N || 0;
        V = Cmc(this, p, V || 0);
        p = [];
        try {
            for (var H = g.F(V), X = H.next(); !X.done; X = H.next()) {
                var d = X.value
                  , a = d.trackData
                  , E = d.oE;
                if (typeof a !== "string") {
                    V = p;
                    var l = V.concat
                      , t = C
                      , c = a
                      , T = E
                      , M = N;
                    if (!RCy(c))
                        throw Error("Invalid binary caption track data");
                    this.T || (this.T = new xn(M,t));
                    var J = this.T.lX(c, T);
                    var S = l.call(V, J)
                } else {
                    if (a.substring(0, 6) === "WEBVTT") {
                        V = p;
                        var D = V.concat;
                        this.T || (this.T = new zL);
                        var Z = this.T.lX(a, E);
                        Math.random() < .01 && g.eG(Error("Deprecated subtitles format in web player: WebVTT"));
                        var f = D.call(V, Z)
                    } else {
                        V = p;
                        var q = V.concat;
                        a: {
                            t = C;
                            if (a[0] === "{")
                                try {
                                    this.T || (this.T = new ye(jb2(t)));
                                    var A = this.T.lX(a, E);
                                    break a
                                } catch (W) {
                                    g.nm(W);
                                    A = [];
                                    break a
                                }
                            var z = g.rv(a);
                            if (!z || !z.firstChild) {
                                var Q = Error("Invalid caption track data");
                                Q.params = a;
                                throw Q;
                            }
                            if (z.firstChild.tagName === "timedtext") {
                                if (Number(z.firstChild.getAttribute("format")) === 3) {
                                    c = z;
                                    this.T || (this.T = new DI(jb2(t),this.yn));
                                    A = this.T.lX(c, E);
                                    break a
                                }
                                var P = Error("Unsupported subtitles format in web player (Format2)");
                                P.params = a;
                                throw P;
                            }
                            if (z.firstChild.tagName === "transcript") {
                                var VL = Error("Unsupported subtitles format in web player (Format1)");
                                VL.params = a;
                                throw VL;
                            }
                            var au = Error("Invalid caption track data");
                            au.params = a;
                            throw au;
                        }
                        f = q.call(V, A)
                    }
                    S = f
                }
                p = S
            }
            return p
        } catch (W) {
            return this.logger.T(187101178, "Captions parsing failed: " + W.message + ". "),
            this.clear(),
            []
        }
    }
    ;
    Rn.prototype.clear = function() {
        this.T && this.T.dispose();
        this.T = null
    }
    ;
    Rn.prototype.reset = function() {
        this.T && this.T.reset()
    }
    ;
    Rn.prototype.CS = function() {
        g.Y.prototype.CS.call(this);
        this.clear()
    }
    ;
    var Qe = {
        windowColor: "#080808",
        windowOpacity: 0,
        textAlign: 2,
        Qv: 7,
        Ev: 50,
        qX: 100,
        isDefault: !0,
        yL: {
            background: "#080808",
            backgroundOpacity: .75,
            charEdgeStyle: 0,
            color: "#fff",
            fontFamily: 4,
            fontSizeIncrement: 0,
            textOpacity: 1,
            offset: 1
        }
    };
    g.m(n9, g.IT);
    g.h = n9.prototype;
    g.h.CS = function() {
        if (this.W || this.Sa) {
            var p = this.N.Nt();
            p && !p.fS() && p.nf()
        } else
            MSE(this, !1);
        g.IT.prototype.CS.call(this)
    }
    ;
    g.h.PN = function() {
        return this.yn.G("html5_honor_caption_availabilities_in_audio_track") && this.S !== "LIVE" && this.S !== "SABR_LIVE"
    }
    ;
    g.h.zE = function() {
        if (this.UY)
            return this.W || this.Sa;
        var p = this.getAudioTrack();
        if (this.PN()) {
            if (!p.captionTracks.length)
                return !1;
            if (!this.T)
                return !0
        }
        p = zQr(p, g.wG(this.yn));
        return p === "CAPTIONS_INITIAL_STATE_ON_REQUIRED" ? !0 : p === "CAPTIONS_INITIAL_STATE_OFF_REQUIRED" ? e$(this) : XXG(this) || e$(this) ? !0 : d7P(this)
    }
    ;
    g.h.load = function() {
        g.IT.prototype.load.call(this);
        this.Z = this.getAudioTrack();
        if (this.T)
            this.C && (this.KS.clear(),
            this.W ? hN0(this, !0) : this.player.getPresentingPlayerType() !== 3 && this.T.HS(this.C, "json3", this.ER),
            this.W || this.Sa || $n(this) || this.player.Ba("captionschanged", g.sj(this.C)));
        else {
            var p;
            this.S === "OFFLINE" ? p = new In(this.player,this.videoData,this.getAudioTrack()) : this.S === "SABR_LIVE" ? p = new wey(this.videoData.T,this.player) : this.S === "LIVE" ? p = new sb(this.videoData.T,this.player) : this.S === "INNERTUBE" ? p = new g.oT(this.player,this.videoData,this.getAudioTrack()) : p = new g.xW(this.player,this.videoData.iW,this.videoData.videoId,g.vgS(this.videoData),this.videoData.lF,this.videoData.eventId);
            this.T = p;
            g.R(this, this.T);
            this.T.Jr(this.ER)
        }
    }
    ;
    g.h.unload = function() {
        this.W && this.C ? hN0(this, !1) : (this.Ga && g.d0(this.Ga),
        this.player.qt("captions"),
        this.Wr = [],
        this.T && this.T.MX(),
        this.KS.clear(),
        this.a$ && this.player.d7(this.a$),
        this.uo());
        g.IT.prototype.unload.call(this);
        this.player.kQ();
        this.player.Ba("captionschanged", {})
    }
    ;
    g.h.create = function() {
        this.zE() && this.load();
        var p;
        a: {
            var C, V, N;
            if (this.yn.G("web_player_nitrate_promo_tooltip") && ((C = this.videoData.getPlayerResponse()) == null ? 0 : (V = C.captions) == null ? 0 : (N = V.playerCaptionsTracklistRenderer) == null ? 0 : N.enableTouchCaptionsNitrate)) {
                var H, X;
                if (C = (p = this.videoData.getPlayerResponse()) == null ? void 0 : (H = p.captions) == null ? void 0 : (X = H.playerCaptionsTracklistRenderer) == null ? void 0 : X.captionTracks)
                    for (p = g.F(C),
                    H = p.next(); !H.done; H = p.next())
                        if (H = H.value,
                        H.kind === "asr" && H.languageCode === "en") {
                            p = !0;
                            break a
                        }
            }
            p = !1
        }
        p && this.N.publish("showpromotooltip", this.D.element)
    }
    ;
    g.h.m$ = function() {
        var p = zQr(this.player.getAudioTrack(), g.wG(this.yn));
        var C = p === "CAPTIONS_INITIAL_STATE_ON_REQUIRED" ? w5(this, this.J) : p === "CAPTIONS_INITIAL_STATE_OFF_REQUIRED" && e$(this) ? PM(this) : XXG(this) || this.J || d7P(this) ? w5(this, this.J) : e$(this) ? PM(this) : null;
        if (this.W || this.Sa) {
            var V = g.vx(this.T.T, !0);
            p = [];
            for (var N = 0; N < V.length; N++) {
                var H = V[N]
                  , X = g.iK("TRACK");
                X.setAttribute("kind", "subtitles");
                X.setAttribute("label", g.hA(H));
                X.setAttribute("srclang", g.aI(H));
                X.setAttribute("id", H.toString());
                this.Sa || X.setAttribute("src", this.T.Es(H, "vtt"));
                H === C && X.setAttribute("default", "1");
                p.push(X)
            }
            C = this.N.Nt();
            C.Qm(p);
            p = C.V$();
            this.Wc && this.Vn.U(p.textTracks, "change", this.DZ$)
        } else
            !this.C && C && WM(this, C),
            this.player.Ba("onCaptionsTrackListChanged"),
            this.player.v1("onApiChange")
    }
    ;
    g.h.DZ$ = function() {
        for (var p = this.N.Nt().V$().textTracks, C = null, V = 0; V < p.length; V++)
            if (p[V].mode === "showing")
                a: {
                    C = g.vx(this.T.T, !0);
                    for (var N = 0; N < C.length; N++)
                        if (C[N].toString() === p[V].id) {
                            C = C[N];
                            break a
                        }
                    C = null
                }
        (this.loaded ? this.C : null) !== C && WM(this, C, !0)
    }
    ;
    g.h.IZa = function() {
        !this.C && this.W || this.unload()
    }
    ;
    g.h.b3 = function(p, C, V, N) {
        if (p) {
            var H;
            aC8(this, (H = this.C) != null ? H : void 0);
            this.T.H2() && (this.Wr = [],
            this.N.qt("captions"),
            iJ(this.vr),
            this.KS.reset());
            if (this.videoData.kt) {
                var X;
                V = ((X = V) != null ? X : 0) + this.videoData.kt
            }
            p = this.KS.lX(p, C, V, N);
            if (this.Qn)
                for (C = g.F(p),
                V = C.next(); !V.done; V = C.next())
                    V = V.value,
                    V.V = this.videoData.clientPlaybackNonce,
                    V.SI = this.videoData.kt;
            C = !this.yn.G("html5_keep_caption_data_after_seek") && (this.S === "LIVE" || this.S === "SABR_LIVE");
            this.player.d7(p, void 0, C);
            !this.J || this.Sa || $n(this) || !this.yn.Um || g.bH(this.yn) || g.yj(this.yn) || g.gk(this.yn) || this.yn.Wr === "shortspage" || this.player.isInline() || (g.d0(this.Ga),
            p = A2Y({
                Qv: 0,
                Ev: 5,
                qX: 5,
                ZJ: 2,
                textAlign: 0,
                v$: 0,
                lang: "en"
            }),
            this.Y_ = [p],
            C = ["Click ", " for settings"],
            this.qo || (V = new g.mz(g.x0()),
            g.R(this, V),
            this.qo = V.element),
            V = p.end - p.start,
            (N = g.hA(this.C)) && this.Y_.push(new vM(p.start,V,0,p.id,N)),
            this.Y_.push(new vM(p.start,V,0,p.id,C[0]), new vM(p.start,V,0,p.id,this.qo,!0), new vM(p.start,V,0,p.id,C[1],!0)),
            this.player.d7(this.Y_),
            g.HF(this.Ga));
            !this.J || this.Sa || $n(this) || (g.wG(this.yn) ? L9(this, !0) : g5(this, !0),
            this.Z && (this.Z.S = this.C),
            this.player.kQ());
            this.J = !1
        }
    }
    ;
    g.h.onCueRangeEnter = function(p) {
        this.Wr.push(p);
        iJ(this.vr)
    }
    ;
    g.h.onCueRangeExit = function(p) {
        g.rY(this.Wr, p);
        this.T instanceof sb && this.T.D && this.player.p$([p]);
        iJ(this.vr)
    }
    ;
    g.h.getCaptionWindowContainerId = function() {
        return this.D.element.id
    }
    ;
    g.h.tdn = function() {
        TAv(this, this.Y_);
        this.Y_ = null
    }
    ;
    g.h.V7 = function() {
        var p = this;
        if (!this.kM || !this.W) {
            this.vr.stop();
            g.Bwu(this.R$);
            this.Wr.sort(g.aj);
            var C = this.Wr;
            if (this.a$) {
                var V = g.JT(C, function(X) {
                    return this.a$.indexOf(X) === -1
                }, this);
                V.length && (C = V)
            }
            C = g.F(C);
            for (V = C.next(); !V.done; V = C.next())
                lCy(this, V.value);
            C = g.F(Object.entries(this.sY));
            var N = C.next();
            for (V = {}; !N.done; V = {
                AS: void 0,
                Le: void 0
            },
            N = C.next()) {
                var H = g.F(N.value);
                N = H.next().value;
                H = H.next().value;
                V.AS = N;
                V.Le = H;
                this.R$[V.AS] ? (V.Le.element.parentNode || (V.Le instanceof Yn || V.Le instanceof bJ || g.O_(this.sY, function(X) {
                    return function(d, a) {
                        a !== X.AS && d.C.params.Qv === X.Le.C.params.Qv && d.C.params.Ev === X.Le.C.params.Ev && d.C.params.qX === X.Le.C.params.qX && (d.dispose(),
                        delete p.sY[a]);
                        return a === X.AS
                    }
                }(V), this),
                this.D.element.appendChild(V.Le.element)),
                V.Le.lC(this.R$[V.AS])) : (V.Le.dispose(),
                delete this.sY[V.AS])
            }
        }
    }
    ;
    g.h.Jir = function() {
        NA2(this, {}, !0);
        this.player.Ba("captionssettingschanged")
    }
    ;
    g.h.qd = function() {
        var p = Qe.yL;
        p = {
            background: p.background,
            backgroundOpacity: p.backgroundOpacity,
            charEdgeStyle: p.charEdgeStyle,
            color: p.color,
            fontFamily: p.fontFamily,
            fontSizeIncrement: p.fontSizeIncrement,
            fontStyle: p.bold && p.italic ? 3 : p.bold ? 1 : p.italic ? 2 : 0,
            textOpacity: p.textOpacity,
            windowColor: Qe.windowColor,
            windowOpacity: Qe.windowOpacity
        };
        var C = W95() || {};
        C.background != null && (p.background = C.background);
        C.backgroundOverride != null && (p.backgroundOverride = C.backgroundOverride);
        C.backgroundOpacity != null && (p.backgroundOpacity = C.backgroundOpacity);
        C.backgroundOpacityOverride != null && (p.backgroundOpacityOverride = C.backgroundOpacityOverride);
        C.charEdgeStyle != null && (p.charEdgeStyle = C.charEdgeStyle);
        C.charEdgeStyleOverride != null && (p.charEdgeStyleOverride = C.charEdgeStyleOverride);
        C.color != null && (p.color = C.color);
        C.colorOverride != null && (p.colorOverride = C.colorOverride);
        C.fontFamily != null && (p.fontFamily = C.fontFamily);
        C.fontFamilyOverride != null && (p.fontFamilyOverride = C.fontFamilyOverride);
        C.fontSizeIncrement != null && (p.fontSizeIncrement = C.fontSizeIncrement);
        C.fontSizeIncrementOverride != null && (p.fontSizeIncrementOverride = C.fontSizeIncrementOverride);
        C.fontStyle != null && (p.fontStyle = C.fontStyle);
        C.fontStyleOverride != null && (p.fontStyleOverride = C.fontStyleOverride);
        C.textOpacity != null && (p.textOpacity = C.textOpacity);
        C.textOpacityOverride != null && (p.textOpacityOverride = C.textOpacityOverride);
        C.windowColor != null && (p.windowColor = C.windowColor);
        C.windowColorOverride != null && (p.windowColorOverride = C.windowColorOverride);
        C.windowOpacity != null && (p.windowOpacity = C.windowOpacity);
        C.windowOpacityOverride != null && (p.windowOpacityOverride = C.windowOpacityOverride);
        return p
    }
    ;
    g.h.bS = function(p, C) {
        var V = {};
        Object.assign(V, W95());
        Object.assign(V, p);
        NA2(this, V, C);
        this.player.Ba("captionssettingschanged")
    }
    ;
    g.h.uo = function() {
        !this.W && this.loaded && (g.ZH(this.sY, function(p, C) {
            p.dispose();
            delete this.sY[C]
        }, this),
        this.V7())
    }
    ;
    g.h.DP = function(p, C) {
        switch (p) {
        case "fontSize":
            if (isNaN(C))
                break;
            p = g.J9(C, -2, 4);
            this.bS({
                fontSizeIncrement: p
            });
            return p;
        case "reload":
            C && !this.W && WM(this, this.C, !0);
            break;
        case "stickyLoading":
            C !== void 0 && this.yn.D && (g.wG(this.yn) ? L9(this, !!C) : g5(this, !!C));
            break;
        case "track":
            return c8r(this, C);
        case "tracklist":
            return this.T ? g.AU(g.vx(this.T.T, !(!C || !C.includeAsr)), function(V) {
                return g.sj(V)
            }) : [];
        case "translationLanguages":
            return this.T ? this.T.W.map(function(V) {
                return Object.assign({}, V)
            }) : [];
        case "sampleSubtitles":
            this.W || C === void 0 || MSE(this, !!C);
            break;
        case "sampleSubtitlesCustomized":
            this.W || MSE(this, !!C, C);
            break;
        case "recommendedTranslationLanguages":
            return g.e3();
        case "defaultTranslationSourceTrackIndices":
            return this.T ? this.T.J : []
        }
    }
    ;
    g.h.getOptions = function() {
        var p = "reload fontSize track tracklist translationLanguages sampleSubtitle".split(" ");
        this.yn.D && p.push("stickyLoading");
        return p
    }
    ;
    g.h.St = function() {
        var p = this.C;
        if (this.N.Ht("captions")) {
            if (this.yn.G("html5_modify_caption_vss_logging")) {
                var C;
                return (p = (C = this.videoData.Hv) != null ? C : null) ? {
                    cc: g.OaY(p)
                } : {}
            }
            if (p)
                return C = p.vssId,
                p.translationLanguage && C && (C = "t" + C + "." + g.aI(p)),
                {
                    cc: C
                }
        }
        return {}
    }
    ;
    g.h.cEV = function() {
        this.isSubtitlesOn() ? (g.wG(this.yn) ? L9(this, !1) : g5(this, !1),
        aC8(this),
        this.yn.G("html5_report_caption_format_change") ? WM(this, null, !0) : (this.unload(),
        e$(this, !0) && WM(this, PM(this), !1))) : this.Dn()
    }
    ;
    g.h.Dn = function() {
        var p = $n(this) || !this.C ? w5(this, !0) : this.C;
        this.yn.G("html5_report_caption_format_intent") && p && this.eO(p.vssId, "m");
        this.isSubtitlesOn() || WM(this, $n(this) || !this.C ? w5(this, !0) : this.C, !0)
    }
    ;
    g.h.isSubtitlesOn = function() {
        return !!this.loaded && !!this.C && !$n(this)
    }
    ;
    g.h.fea = function() {
        var p = $n(this);
        e$(this, p) ? WM(this, this.getAudioTrack().T, !1) : this.videoData.captionTracks.length && (this.loaded && this.unload(),
        this.PN() && (this.J = !1,
        this.C = null,
        this.T && (this.T.dispose(),
        this.T = null)),
        this.zE() && (p ? WM(this, w5(this, !1), !1) : this.load()))
    }
    ;
    g.h.wr = function(p) {
        p && (this.b_ = {
            top: p.top,
            right: p.right,
            bottom: p.bottom,
            left: p.left,
            width: 1 - p.left - p.right,
            height: 1 - p.top - p.bottom
        },
        this.D.element.style.top = this.b_.top * 100 + "%",
        this.D.element.style.left = this.b_.left * 100 + "%",
        this.D.element.style.width = this.b_.width * 100 + "%",
        this.D.element.style.height = this.b_.height * 100 + "%",
        this.D.element.style.position = "absolute",
        p = tS2(this)) && (this.D.element.style.width = p.width + "px",
        this.D.element.style.height = p.height + "px")
    }
    ;
    g.h.onVideoDataChange = function(p, C) {
        p === "newdata" && (this.videoData = C,
        this.loaded && this.unload(),
        this.J = !1,
        this.C = null,
        this.T && (this.T.dispose(),
        this.T = null,
        this.player.Ba("captionschanged", {})),
        this.zE() && this.load())
    }
    ;
    g.h.getAudioTrack = function() {
        return this.Qn && this.player.getPresentingPlayerType() === 2 ? this.videoData.Uv : this.player.getAudioTrack()
    }
    ;
    g.h.Cxn = function() {
        var p = this.N.Nt();
        p && !p.fS() && p.nf();
        this.N.isFullscreen() ? (this.W = this.UY = !0,
        this.loaded && this.m$()) : (this.UY = this.yn.controlsType === "3",
        this.W = VSG(this));
        WM(this, this.C)
    }
    ;
    g.h.SR = function() {
        var p, C, V, N = (p = this.videoData.getPlayerResponse()) == null ? void 0 : (C = p.captions) == null ? void 0 : (V = C.playerCaptionsTracklistRenderer) == null ? void 0 : V.openTranscriptCommand;
        N && this.player.Jk("innertubeCommand", N)
    }
    ;
    g.h.Qo = function(p, C, V) {
        var N = /&|,|:|;|(\n)|(\s)|(\/)|(\\)/gm
          , H = "";
        p && (H = p.vssId,
        H = H.replace(N, ""));
        var X = "";
        p && p.getId() && (X = p.getId() || "");
        p && p.getXtags() && (p = p.getXtags(),
        p = p.replace(N, ""),
        X = X.concat(";" + p));
        this.N.Qo(C ? H : "", C ? X : "", V)
    }
    ;
    g.h.eO = function(p, C) {
        p = (p || "").replace(/&|,|:|;|(\n)|(\s)|(\/)|(\\)/gm, "");
        p.length > 0 && this.N.eO(p, C)
    }
    ;
    g.h.lN = function() {
        this.T && this.T.lN()
    }
    ;
    g.Rv.JR(n9, {
        V7: "smucd"
    });
    g.qA("captions", n9);
}
)(_yt_player);