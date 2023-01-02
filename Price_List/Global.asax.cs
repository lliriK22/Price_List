using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using System.Data.Entity;
using Price_List.Models;

namespace Price_List
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            //Database.SetInitializer(new PriceListDbInitializer());

            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
			//Database.SetInitializer<ProductContext>(new DropCreateDatabaseIfModelChanges<ProductContext>());
			//Database.SetInitializer<PriceListContext>(new DropCreateDatabaseIfModelChanges<PriceListContext>());
		}
    }
}
