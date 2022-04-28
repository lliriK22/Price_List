using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Price_List.Models
{
    public class Product
    {
        [Column("Id"), HiddenInput(DisplayValue = false)]
        public int Id { get; set; }
        [Column("Name")]
        public string Name { get; set; }
        [Column("PriceId"), HiddenInput(DisplayValue = false)]
        public int PriceId { get; set; }
        [Column("ColAdd")]
        public string ColAdd { get; set; }
    }
}