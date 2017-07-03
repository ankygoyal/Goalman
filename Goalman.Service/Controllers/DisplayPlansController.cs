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
            Dictionary<int, string> userGoals = new Dictionary<int, string>();
            userGoals.Add(1, "Retirement Plan");
            userGoals.Add(2,"Build Wealth Plan");
            string planSpeech = "";
            string speech = "";
            foreach (int key in userGoals.Keys)
                {
                    speech = speech + userGoals[key];
                    speech = speech + ",";
                }
            Body.speech = "Your have " + speech;
            Body.displayText = "Your have one plan with planid: 0, plan type: retirement";
           // Body.source = "IPSIT Financial Planning";
            return Body;
        }
    }
}
