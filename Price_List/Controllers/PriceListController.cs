using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;
using Price_List.Models;
using System.Data;
using System.Web.SessionState;

namespace Price_List.Controllers
{
    public class PriceListController : Controller
    {
        PriceListContext BD_PL = new PriceListContext();

		public ActionResult Index()
        {
            var pl = BD_PL.PriceLists;

            return View(pl);
        }

        [HttpGet]
        public ActionResult AddPriceList()
        {
            PriceList pl = new PriceList();

            return PartialView(pl);
        }
        [HttpPost]
        public ActionResult AddPriceList(PriceList pl)
        {
            if(pl != null && pl.Name != null)
            {
				BD_PL.PriceLists.Add(pl);
				BD_PL.SaveChanges();
			}

			return RedirectToAction("Index");
		}

        public ActionResult EditPriceList(int id)
        {
            var pl = BD_PL.PriceLists.ToList().FirstOrDefault(x => x.Id == id);

            if(pl != null)
                return PartialView(pl);
            return HttpNotFound();
        }

        [HttpPost]
        public ActionResult EditPriceList(PriceList pl)
        {
            PriceList dbEntry = BD_PL.PriceLists.Find(pl.Id);

            if (dbEntry != null && dbEntry.Name != null)
            {
                dbEntry.Name = pl.Name;
				BD_PL.SaveChanges();
			}

            return RedirectToAction("Index");
        }

        public ActionResult DeletePriceList(PriceList pl)
        {
            if (pl != null)
                return PartialView(pl);

            return RedirectToAction("Index");
        }

        [HttpPost]
        public ActionResult DeletePriceList(string _id)
        {
            int id = int.Parse(_id);
            var pl = BD_PL.PriceLists.ToList().FirstOrDefault(x => x.Id == id);
            var p = BD_PL.Products.ToList().Where(x => x.PriceId == id);

            if (p != null)
            {
                for (int i = 0; i < p.ToList().Count; i++)
                {
                    BD_PL.Products.Remove(p.ToList()[i]);
                }
                BD_PL.SaveChanges();
            }

            if (pl != null)
            {
                BD_PL.PriceLists.Remove(pl);
                BD_PL.SaveChanges();
            }

            return RedirectToAction("Index");
        }
    }
}