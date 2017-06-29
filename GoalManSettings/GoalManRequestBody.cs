using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoalManSettings
{
    public class GoalManRequestBody
    {
        public string id { get; set; }
        public string timestamp { get; set; }
        public string lang { get; set; }
        public RequestResult result { get; set; }
        public RequestStatus status { get; set; }
        public string sessionId { get; set; }
    }
}
