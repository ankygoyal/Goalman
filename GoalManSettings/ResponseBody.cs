using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoalManSettings
{
    public class ResponseBody
    {
        public string speech { get; set; }
        public string displayText { get; set; }
        public ResponseData data { get; set; }
        public ResponseContextOut contextOut { get; set; }
        public string source { get; set; }
    }
}
