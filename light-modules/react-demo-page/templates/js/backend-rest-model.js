var BackendRestModel = function () {


    /**
     * Hit a Magnolia delivery endpoint and return the results.

     This lets us do everything on the server during template render process
     so that the client does not need to make an extra request to get the content from the endpoint.
     *
     * @param endpoint
     *            The path to the endpoint, after the standard '/.rest' prefix.
     * @return The  content
     */
    this.getFromMagEndpoint = function(endpoint) {
        var url = ctx.request.scheme + "://" + ctx.request.serverName + ":" + ctx.request.serverPort + ctx.contextPath;
        var response = this.httpGet(url + "/.rest" + endpoint);

        return response.data;
    }

    this.httpGet = function(theUrl){
        var con = new java.net.URL(theUrl).openConnection();
        con.requestMethod = "GET";

        return this.asResponse(con);
    }

    this.asResponse = function(con){
        var d = this.read(con.inputStream);

        return {data : d, statusCode : con.responseCode};
    }

    this.read = function(inputStream){
        var inReader = new java.io.BufferedReader(new java.io.InputStreamReader(inputStream));
        var inputLine;
        var response = new java.lang.StringBuffer();

        while ((inputLine = inReader.readLine()) != null) {
               response.append(inputLine);
        }
        inReader.close();
        return response.toString();
    }

};


new BackendRestModel();
