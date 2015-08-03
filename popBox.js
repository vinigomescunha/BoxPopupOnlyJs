var popUp = function(el, uDef) {
    var def = {
        layerId: 'popupLayer',
        popupId: 'popupInner',
        /* id of background */
        layer: { /* style of layer */
            position: "fixed",
            width: window.innerWidth + "px",
            height: window.innerHeight + "px",
            backgroundColor: "#333",
            opacity: ".9",
            top: "0px",
            left: "0px"
        },
        popup: { /* style of popup */
            maxWidth: "300px",
            maxHeight: "100px",
            height: "100%",
            backgroundColor: "#FFF",
            padding: "5px",
            margin: "100px auto"
        },
        loadEl: function(d) {
            /* load element div width style defined */
            var div = document.createElement('div');
            for (var s in def[d])
                div['style'][s] = def[d][s];
            div.setAttribute("id", def[d + "Id"]);
            return div;
        },
        loadUd: function() {
            /* load user style */
            if (uDef)
                for (var d in uDef)
                    for (var dl in uDef[d]) {
                        def[d][dl] = uDef[d][dl];
                    }
        },
        hide: function(e) {
            var op = 1; // initial opacity
            var t = setInterval(function() {
                if (op <= 0.1) {
                    clearInterval(t);
                    e.style.display = 'none';
                }
                e.style.opacity = op;
                e.style.filter = 'alpha(opacity=' + op * 100 + ")";
                op -= op * 0.1;
            }, 20);
        },
        pop: function() {
            /* load Layer */
            def.loadUd(); /*load user defined style*/
            var l = def.loadEl('layer'),
                p = def.loadEl('popup'),
                elm = document.getElementById(def.layerId),
                sel = document.body.querySelector(el),
                a = document.createElement('a');
            a.classList.add('closebtn');
            p.innerHTML = a.outerHTML + sel.innerHTML;
            l.innerHTML = p.outerHTML;
            if (elm)
                elm.remove();
            document.body.appendChild(l);

        }
    };
    def.pop();
    document.body.querySelector('.closebtn').onclick = function() {
        def.hide(document.getElementById(def.layerId));
    }
    window.onresize = function() {
        if (document.getElementById(def.layerId)) {
            var l = uDef && uDef.layer ? uDef.layer : {
                "layer": {}
            };
            l.width = window.innerWidth + "px",
                l.height = window.innerHeight + "px";
            popUp(el, l);
        }
    }

};