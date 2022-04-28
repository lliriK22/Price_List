using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Xml;

namespace Price_List.Models
{
    [Table("dbo.PriceLists")]
    public class PriceList
    {
        [Column("Id"), HiddenInput(DisplayValue = false)]
        public int Id { get; set; }
        [Column("Name")]
        public string Name { get; set; }
        [Column("ColAdd")]
        public string ColAdd { get; set; }
    }
}