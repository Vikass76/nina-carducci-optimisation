!(function (a) {
  (a.fn.mauGallery = function (e) {
    var e = a.extend(a.fn.mauGallery.defaults, e),
      t = [];
    return this.each(function () {
      a.fn.mauGallery.methods.createRowWrapper(a(this)),
        e.lightBox &&
          a.fn.mauGallery.methods.createLightBox(
            a(this),
            e.lightboxId,
            e.navigation
          ),
        a.fn.mauGallery.listeners(e),
        a(this)
          .children(".gallery-item")
          .each(function (l) {
            a.fn.mauGallery.methods.responsiveImageItem(a(this)),
              a.fn.mauGallery.methods.moveItemInRowWrapper(a(this)),
              a.fn.mauGallery.methods.wrapItemInColumn(a(this), e.columns);
            var i = a(this).data("gallery-tag");
            e.showTags && void 0 !== i && -1 === t.indexOf(i) && t.push(i);
          }),
        e.showTags &&
          a.fn.mauGallery.methods.showItemTags(a(this), e.tagsPosition, t),
        a(this).show();
    });
  }),
    (a.fn.mauGallery.defaults = {
      columns: 3,
      lightBox: !0,
      lightboxId: null,
      showTags: !0,
      tagsPosition: "bottom",
      navigation: !0,
    }),
    (a.fn.mauGallery.listeners = function (e) {
      a(".gallery-item").on("click", function () {
        e.lightBox &&
          "IMG" === a(this).prop("tagName") &&
          a.fn.mauGallery.methods.openLightBox(a(this), e.lightboxId);
      }),
        a(".gallery").on(
          "click",
          ".nav-link",
          a.fn.mauGallery.methods.filterByTag
        ),
        a("body").on("click", ".mg-prev", () =>
          a.fn.mauGallery.methods.prevImage(e.lightboxId)
        ),
        a("body").on("click", ".mg-next", () =>
          a.fn.mauGallery.methods.nextImage(e.lightboxId)
        );
    }),
    (a.fn.mauGallery.methods = {
      createRowWrapper(a) {
        a.children().first().hasClass("row") ||
          a.append('<div class="gallery-items-row row"></div>');
      },
      wrapItemInColumn(a, e) {
        if (e.constructor === Number)
          a.wrap(
            `<div class='item-column mb-4 col-${Math.ceil(12 / e)}'></div>`
          );
        else if (e.constructor === Object) {
          var t = "";
          e.xs && (t += ` col-${Math.ceil(12 / e.xs)}`),
            e.sm && (t += ` col-sm-${Math.ceil(12 / e.sm)}`),
            e.md && (t += ` col-md-${Math.ceil(12 / e.md)}`),
            e.lg && (t += ` col-lg-${Math.ceil(12 / e.lg)}`),
            e.xl && (t += ` col-xl-${Math.ceil(12 / e.xl)}`),
            a.wrap(`<div class='item-column mb-4${t}'></div>`);
        } else
          console.error(
            `Columns should be defined as numbers or objects. ${typeof e}is not supported.`
          );
      },
      moveItemInRowWrapper(a) {
        a.appendTo(".gallery-items-row");
      },
      responsiveImageItem(a) {
        "IMG" === a.prop("tagName") &&
          (a.addClass("img-fluid"),
          a.attr("loading", "lazy"),
          a.attr("alt", a.attr("alt") || "Image galerie"));
      },
      openLightBox(e, t) {
        a(`#${t}`).find(".lightboxImage").attr("src", e.attr("src")),
          a(`#${t}`).modal("toggle");
      },
      prevImage(a) {
        let e = $(`#${a}.lightboxImage`).attr("src"),
          t = $("img.gallery-item")
            .map(function () {
              return $(this).attr("src");
            })
            .get(),
          l = (t.indexOf(e) - 1 + t.length) % t.length;
        $(`#${a}.lightboxImage`).attr("src", t[l]);
      },
      nextImage(a) {
        let e = $(`#${a}.lightboxImage`).attr("src"),
          t = $("img.gallery-item")
            .map(function () {
              return $(this).attr("src");
            })
            .get(),
          l = (t.indexOf(e) + 1) % t.length;
        $(`#${a}.lightboxImage`).attr("src", t[l]);
      },
      createLightBox(a, e, t) {
        a.append(
          `<div class="modal fade" id="${
            e || "galleryLightbox"
          }" tabindex="-1" role="dialog" aria-hidden="true"> <div class="modal-dialog" role="document"> <div class="modal-content"> <div class="modal-body"> ${
            t
              ? '<div class="mg-prev" style="cursor:pointer;position:absolute;top:50%;left:-15px;background:white;"><</div>'
              : '<span style="display:none;" />'
          }<img class="lightboxImage img-fluid" alt="Contenu de l'image affichÃ©e dans la modale au clique"/> ${
            t
              ? '<div class="mg-next" style="cursor:pointer;position:absolute;top:50%;right:-15px;background:white;}">></div>'
              : '<span style="display:none;" />'
          }</div> </div> </div> </div>`
        );
      },
      showItemTags(e, t, l) {
        var i =
          '<li class="nav-item"><span class="nav-link active active-tag" data-images-toggle="all">Tous</span></li>';
        a.each(l, function (a, e) {
          i += `<li class="nav-item active"> <span class="nav-link" data-images-toggle="${e}">${e}</span></li>`;
        });
        var s = `<ul class="my-4 tags-bar nav nav-pills">${i}</ul>`;
        "bottom" === t
          ? e.append(s)
          : "top" === t
          ? e.prepend(s)
          : console.error(`Unknown tags position:${t}`);
      },
      filterByTag() {
        if ($(this).hasClass("active-tag")) return;
        $(".tags-bar .nav-link").removeClass("active active-tag"),
          $(this).addClass("active active-tag");
        let a = $(this).data("images-toggle");
        $(".item-column").hide(),
          "all" === a
            ? $(".item-column").fadeIn(200)
            : $(`.item-column:has([data-gallery-tag='${a}'])`).fadeIn(200);
      },
    });
})(jQuery);
