using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;

namespace MainNamespace
{
    /*
    The class that identify a process
    */
    public class Process
    {
        private string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Periodicity { get; set; }
        public string ExecutionDate { get; set; }
        public string FinalState { get; set; }
    }

    /*
    The main class of application
    */
    public class Main
    {
        private const string URL = "http://localhost:8000/processes";
        private string urlParameters = "";
    
        static void Main(string[] args) {
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(URL);

            // Add an Accept header for JSON format.
            client.DefaultRequestHeaders.Accept.Add(
            new MediaTypeWithQualityHeaderValue("application/json"));

            // List data response.
            HttpResponseMessage response = client.GetAsync(urlParameters).Result;
            if (response.IsSuccessStatusCode) {
                // Parse the response body.
                var processes = response.Content.ReadAsAsync<IEnumerable<Process>>().Result;
                foreach (var d in processes) {
                    Console.WriteLine("Process ID: {0}", d.Id);
                    Console.WriteLine("Process name: {0}", d.Name);
                    Console.WriteLine("Process description: {0}", d.Description);
                    Console.WriteLine("Process periodicity: {0}", d.Periodicity);
                    Console.WriteLine("Process execution date: {0}", d.ExecutionDate);
                    Console.WriteLine("Process final state: {0}", d.FinalState);
                    Console.WriteLine("-------------");
                }
            } else {
                Console.WriteLine("{0} ({1})", (int)response.StatusCode, response.ReasonPhrase);
            }

            //Dispose once all HttpClient calls are complete. This is not necessary if the containing object will be disposed of; for example in this case the HttpClient instance will be disposed automatically when the application terminates so the following call is superfluous.
            client.Dispose();
        }
    }
}