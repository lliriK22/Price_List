﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Price_List.Models
{
    public class Product : BaseModel
    {
		[Column("PriceId")]
		public int PriceId { get; set; }

        [Column("ColAdd")]
		[DisplayName("Доп. колонка")]
		public string ColAdd { get; set; } = string.Empty;
    }
}