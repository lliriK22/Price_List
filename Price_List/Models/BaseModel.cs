using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Price_List.Models
{
	public class BaseModel
	{
		[Column("Id")]
		public int Id { get; set; }

		[Required]
		[DisplayName("Имя")]
		[Column("Name")]
		public string Name { get; set; }
	}
}