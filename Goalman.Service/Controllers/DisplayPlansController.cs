using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using GoalManSettings;
using Newtonsoft.Json;

namespace Goalman.Service.Controllers
{
    public class DisplayPlansController : ApiController
    {
        /*public GoalManRequestBody Get()
        {
            return new GoalManRequestBody();
        }*/
        public ResponseBody Post([FromBody] GoalManRequestBody request)
        {
            // string requestJSON = JsonConvert.SerializeObject(request);
            ResponseBody Body = new ResponseBody();
            Body.speech = "Your List of plans is shown below";
            Body.displayText = "Your have one plan with planid: 0, plan type: retirement";
            Body.source = "IPSIT Financial Planning";
            return Body;
        }
    }
}
