[#include "/tours-json/templates/macros/tours.ftl"]

[#if (ctx.getParameter("destinations")?has_content)]
  [@destinationsJson /]

[#elseif (ctx.getParameter("tour-types")?has_content)]
  [@tourTypesJson /]

[#elseif (ctx.getParameter("detail")?has_content)]
  [@tourDetailJson id=ctx.getParameter("detail") /]

[#else]
  [@toursJson /]

[/#if]
