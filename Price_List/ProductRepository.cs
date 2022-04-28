using Price_List.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Price_List
{
    public class ProductRepository
    {
        private static List<Product> _products;

        public ProductRepository()
        {
            _products = new List<Product>();
        }

        public async Task<List<Product>> GetProducts()
        {
            return await Task.Run(() => _products);
        }

        public async Task<Product> GetProduct(int id)
        {
            return await Task.Run(() => _products.FirstOrDefault(f => f.Id == id));
        }

        public async void AddProduct(Product product)
        {
           await Task.Run(() => _products.Add(product));
           // _products.Add(product);
        }
    }
}