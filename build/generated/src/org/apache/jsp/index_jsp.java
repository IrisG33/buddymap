package org.apache.jsp;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;

public final class index_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final JspFactory _jspxFactory = JspFactory.getDefaultFactory();

  private static java.util.List<String> _jspx_dependants;

  private org.glassfish.jsp.api.ResourceInjector _jspx_resourceInjector;

  public java.util.List<String> getDependants() {
    return _jspx_dependants;
  }

  public void _jspService(HttpServletRequest request, HttpServletResponse response)
        throws java.io.IOException, ServletException {

    PageContext pageContext = null;
    HttpSession session = null;
    ServletContext application = null;
    ServletConfig config = null;
    JspWriter out = null;
    Object page = this;
    JspWriter _jspx_out = null;
    PageContext _jspx_page_context = null;

    try {
      response.setContentType("text/html");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;
      _jspx_resourceInjector = (org.glassfish.jsp.api.ResourceInjector) application.getAttribute("com.sun.appserv.jsp.resource.injector");

      out.write("<html>\n");
      out.write("    <head>\n");
      out.write("        <title>Buddy Map</title>\n");
      out.write("        <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />\n");
      out.write("        <link href=\"css/bootstrap.min.css\" rel=\"stylesheet\" media=\"screen\"></link>\n");
      out.write("        <script type=\"text/javascript\" src=\"js/jquery-1.10.2.js\"></script>\n");
      out.write("        <script src=\"http://maps.google.com/maps/api/js?sensor=false\"></script>\n");
      out.write("        <script>\n");
      out.write("            function initialize() {\n");
      out.write("                var map_canvas = document.getElementById('map_canvas');\n");
      out.write("                var map_options = {\n");
      out.write("                    center: new google.maps.LatLng(44.5403, -78.5463),\n");
      out.write("                    zoom: 8,\n");
      out.write("                    mapTypeId: google.maps.MapTypeId.ROADMAP\n");
      out.write("                }\n");
      out.write("                var map = new google.maps.Map(map_canvas, map_options)\n");
      out.write("            }\n");
      out.write("            google.maps.event.addDomListener(window, 'load', initialize);\n");
      out.write("        </script>\n");
      out.write("        <script type=\"text/javascript\" language=\"javascript\" src=\"fb.js\"></script>\n");
      out.write("    </head>\n");
      out.write("    <body>\n");
      out.write("        <div class=\"container\">\n");
      out.write("            <h3>Locate your Facebook friends</h3>\n");
      out.write("        </div>\n");
      out.write("\n");
      out.write("        <div class=\"span10 offset1\">\n");
      out.write("\n");
      out.write("            <div id=\"map_canvas\"  style=\"height:500px;width:850px\"></div> \n");
      out.write("        </div>   \n");
      out.write("        <div class=\"span2 offset1\">\n");
      out.write("            <div id=\"fb-root\"></div> \n");
      out.write("            <div id=\"status\">\n");
      out.write("                <img src=\"http://hayageek.com/examples/oauth/facebook/oauth-javascript/LoginWithFacebook.png\" style=\"height: 30px; width: 150px\" onclick=\"Login()\"/>\n");
      out.write("            </div> \n");
      out.write("            <div id=\"user_photo\"></div>\n");
      out.write("            <div id=\"friends_list\"></div>\n");
      out.write("            <div id=\"friends_dropdown\"></div>\n");
      out.write("            <div id=\"logout\"></div>\n");
      out.write("        </div>  \n");
      out.write("\n");
      out.write("    </body>\n");
      out.write("</html>\n");
    } catch (Throwable t) {
      if (!(t instanceof SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          out.clearBuffer();
        if (_jspx_page_context != null) _jspx_page_context.handlePageException(t);
        else throw new ServletException(t);
      }
    } finally {
      _jspxFactory.releasePageContext(_jspx_page_context);
    }
  }
}
