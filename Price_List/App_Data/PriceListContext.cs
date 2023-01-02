using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace Price_List.Models
{
	public class PriceListContext : DbContext
	{
		public DbSet<PriceList> PriceLists { get; set; }
		public DbSet<Product> Products { get; set; }
	}
}