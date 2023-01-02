using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Xml;

namespace Price_List.Models
{
    [Table("dbo.PriceLists")]
    public class PriceList : BaseModel
    {
        [Column("ColAdd")]
        [DisplayName("Доп. колонка")]
        public string ColAdd { get; set; } = string.Empty;
    }
}