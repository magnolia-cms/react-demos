[#-- Renders an image (asset) rendition --]
[#macro toursJson ]
  [#assign tours = cmsfn.contentByPath("/magnolia-travels","tours")]
  [#assign json = jsonfn.fromChildNodesOf(tours).addAll().expand("image", "dam").binaryLinkRendition("480").print()]
  ${json!}
[/#macro]

[#macro tourDetailJson id]
  [#assign tour = cmsfn.contentById(id,"tours")]
  [#assign json = jsonfn.from(tour).addAll().expand("image", "dam").expand("destination", "category").print()]
  ${json!}
[/#macro]

[#macro tourTypesJson ]
  [#assign tourtypes = cmsfn.contentByPath("/tour-types","category")]
  [#assign json = jsonfn.fromChildNodesOf(tourtypes).addAll().expand("image", "dam").print()]
  ${json!}
[/#macro]

[#macro destinationsJson ]
  [#assign destinations = cmsfn.contentByPath("/destinations","category")]
  [#assign json = jsonfn.fromChildNodesOf(destinations).addAll().expand("image", "dam").print()]

  ${json!}
[/#macro]
