using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoalManSettings
{
    public class RequestResult
    {
        public string source { get; set; }
        public string resolvedQuery { get; set; }
        public string action { get; set; }
        public string actionIncomplete { get; set; }
        public RequestParameters parameters { get; set; }
        public string[] contexts { get; set; }
        public RequestMetaData metadata { get; set; }
        public Fulfillment fulfillment { get; set; }
        public double score { get; set; }


    }
}
