${resfn.css(["/react-demo-components/webresources/react-tour-search.css"])!}

[#-- For demonstration purposes only - we load React and Babel in the browser instead of prebuilding them. --]

${resfn.js(["/react-demo-components/webresources/libs/babel.*js"])!}
${resfn.js(["/react-demo-components/webresources/libs/react.*js"])!}
${resfn.js(["/react-demo-components/webresources/libs/axios.min.js"])!}

<script type="text/babel" src="${ctx.contextPath}/.resources/react-demo-components/webresources/react-tour-search.js"></script>

<script type="text/babel">

  var dataUrl =  "${ctx.contextPath}/demo-react/tours-endpoint.js"

  //linkContext is added to the front of the link - for example in some cases you might want linkContext='/travel'
  ReactDOM.render(
    <TourSearch
                  dataUrl={dataUrl}
                  linkContext=''
                  labelSearch='${i18n["react-tour-search.search"]}'
                  labelTours='${content.labelTours}'
                  labelFeatured='${content.labelFeatured}'
    />,
    document.getElementById('react_root_${content.@id}')
  );
</script>


<div class="tour-search">

  [#if content.title?has_content]
    <h2>${content.title!}</h2>
  [/#if]

  [#if content.desc?has_content]
    ${cmsfn.decode(content).desc!}
  [/#if]


  [#-- Marketing Promo: Display a link with text or image --]

  [#if content.marketingPromoLink?has_content]
    [#assign target = cmsfn.contentById(content.marketingPromoLink, "website")!]

    <div class='tour-search__marketing'>
      <a href='${cmsfn.link(target)!}' class='btn btn-link'>

        [#if content.image?has_content]
          [#assign image = damfn.getAsset(content.image)]
          [#assign imageLink = image.link]
          <img src='${imageLink!}' class='tour-search__marketing__img' alt=''/>
        [#else]
          ${target.title!target.@name}
        [/#if]

    </a>
  </div>
  [/#if]

  <div id="react_root_${content.@id}"></div>

</div>
