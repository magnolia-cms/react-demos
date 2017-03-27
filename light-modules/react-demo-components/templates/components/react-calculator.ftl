${resfn.css(["/react-demo-components/webresources/react-calculator.css"])!}

[#-- For demonstration purposes only - we load React and Babel in the browser instead of prebuilding them. --]

${resfn.js(["/react-demo-components/webresources/libs/babel.*js"])!}
${resfn.js(["/react-demo-components/webresources/libs/react.*js"])!}
${resfn.js(["/react-demo-components/webresources/libs/axios.min.js"])!}

<script type="text/babel" src="${ctx.contextPath}/.resources/react-demo-components/webresources/react-calculator.js"></script>

<script type="text/babel">

  ReactDOM.render(
    <Calculator
                  label1='${content.label1}'
                  label2='${content.label2}'
                  labelResult='${content.labelResult}'
                  formula='${content.formula}'
    />,
    document.getElementById('react_root_${content.@id}')
  );
</script>


<div class="calculator">

  [#if content.title?has_content]
    <h2>${content.title!}</h2>
  [/#if]

  [#if content.desc?has_content]
    ${cmsfn.decode(content).desc!}
  [/#if]

  [#-- Marketing Promo: Display a link with text or image --]

  [#if content.marketingPromoLink?has_content]
    [#assign target = cmsfn.contentById(content.marketingPromoLink, "website")!]

    <div class='calculator__marketing'>
      <a href='${cmsfn.link(target)!}' class='btn btn-link'>

        [#if content.image?has_content]
          [#assign image = damfn.getAsset(content.image)]
          [#assign imageLink = image.link]
          <img src='${imageLink!}' class='calculator__marketing__img' alt=''/>
        [#else]
          ${target.title!target.@name}
        [/#if]

    </a>
  </div>
  [/#if]

  <div id="react_root_${content.@id}"></div>

</div>
