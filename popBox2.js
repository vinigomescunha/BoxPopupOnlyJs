var popUp = function(el, uDef) {
    var def = {
        layerId: 'popupLayer',
        popupId: 'popupInner',
        /* id of background */
        layer: { /* style of layer */
            width: window.innerWidth + "px",
            height: window.innerHeight + "px",
        },
        popup: { /* style of popup */
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
        document.getElementById(def.layerId).remove();
    }
    window.onresize = function() {
        if (document.getElementById(def.layerId)) {
            var l = uDef && uDef.layer ? uDef.layer : {
                "layer": {}
            };
            l.width = window.innerWidth + "px",
                l.height = window.innerHeight + "px";
            popUp(el, uDef);
        }
    }

};
