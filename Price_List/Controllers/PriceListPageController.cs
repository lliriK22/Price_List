using Newtonsoft.Json;
using Price_List.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Price_List.Controllers
{
    public class PriceListPageController : Controller
    {
        PriceListContext BD_PL = new PriceListContext();

        public ActionResult Index(int id)
        {
            var pl = BD_PL.PriceLists.ToList().Find(x => x.Id == id);
            var p = BD_PL.Products.ToList().Where(s => s.PriceId == id);

            if(pl != null && pl.ColAdd != null)
            {
                ViewBag.JsonObject = JsonConvert.DeserializeObject<dynamic>(pl.ColAdd);
            }
            
            if(p != null)
            {
                ViewBag.JsonValues = new List<dynamic>();

                for (int i = 0; i < p.ToList().Count; i++)
                {
                    var value = JsonConvert.DeserializeObject<dynamic>(p.ToList()[i].ColAdd);
                    ViewBag.JsonValues.Add(value);
                }
            }

            ViewBag.CurrentId = id;
            ViewBag.PriceObject = pl;

            return View(p);
        }

        [HttpGet]
        public ActionResult AddProduct(int id)
        {
            Product p = new Product();

            ViewBag.JsonObject = JsonConvert.DeserializeObject<dynamic>
                (BD_PL.PriceLists.ToList().Find(x => x.Id == id).ColAdd);

            ViewBag.PriceId = id;

            return PartialView(p);
        }
        [HttpPost]
        public ActionResult AddProduct(Product p)
        {
            if (p != null)
            {
                BD_PL.Products.Add(p);
                BD_PL.SaveChanges();
            }

            return RedirectToAction("Index", new { id = p.PriceId });
        }

        public ActionResult EditProduct(int id)
        {
            var p = BD_PL.Products.ToList().FirstOrDefault(x => x.Id == id);
            var pl = BD_PL.PriceLists.ToList().FirstOrDefault(x => x.Id == p.PriceId);

            ViewBag.JsonObject = JsonConvert.DeserializeObject<dynamic>
                (BD_PL.Products.ToList().Find(x => x.Id == id).ColAdd);

            ViewBag.JsonObjectPL = JsonConvert.DeserializeObject<dynamic>(pl.ColAdd);

            ViewBag.ProductId = id;

            if (p != null)
                return PartialView(p);
            return HttpNotFound();
        }

        [HttpPost]
        public ActionResult EditProduct(Product p)
        {
            Product dbEntry = BD_PL.Products.ToList().Find(x=>x.Id == p.Id);

            if (dbEntry != null)
            {
                dbEntry.Name = p.Name;
                dbEntry.ColAdd = p.ColAdd;
            }

            BD_PL.SaveChanges();

            return RedirectToAction("Index", new { id = dbEntry.PriceId });
        }

        public ActionResult DeleteProduct(Product p)
        {
            if (p != null)
                return PartialView(p);

            return RedirectToAction("Index");
        }

        [HttpPost]
        public ActionResult DeleteProduct(string _id)
        {
            int id = int.Parse(_id);
            var p = BD_PL.Products.ToList().FirstOrDefault(x => x.Id == id);

            if (p != null)
            {
                BD_PL.Products.Remove(p);
                BD_PL.SaveChanges();
            }

            return RedirectToAction("Index", new { id = p.PriceId });
        }
    }
}