<!DOCTYPE html>
<html xml:lang="${cmsfn.language()}" lang="${cmsfn.language()}">
  <head>
    [@cms.page /]
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${content.windowTitle!content.title!}</title>
    <meta name="description" content="${content.description!""}" />
    <meta name="keywords" content="${content.keywords!""}" />
    <link rel="shortcut icon" href="${ctx.contextPath}/.resources/react-demo-page/webresources/build/favicon.ico">

    ${resfn.css(["/react-demo-page/webresources/.*css"])!}
  </head>
  <body class="react-demo ${cmsfn.language()}">

    <div id="root"></div>

    [#include "/tours-json/templates/macros/tours.ftl"]
    <script>
    //window.MAGNOLIA_BASE_URL = "http://localhost:8080/magnoliaAuthor"
    window.MAGNOLIA_BASE_URL = "http://localhost:8080${ctx.contextPath}"
    window.MAGNOLIA_BASE_URL_IMAGE = "http://localhost:8080"
    window.PUBLIC_URL = "${ctx.contextPath}/.resources/react-demo-page/webresources/build"

        window.MAGNOLIA_HEADER = "Magnolia Page delivers React App"
        window.MAGNOLIA_HEADER_ABSTRACT ="A single page app delivered in a Magnolia page template."

        // Provide tour data directly in the page.

        window.MAGNOLIA_DESTINATIONS = [@destinationsJson /]
        window.MAGNOLIA_TOURTYPES = [@tourTypesJson /]
        window.MAGNOLIA_TOURS = [@toursJson /]
    </script>

    ${resfn.js(["/react-demo-page/webresources.*js"])!}

  </body>
</html>
