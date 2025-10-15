
namespace InsuranceHub.Domain.Models.SSF
{
    public class SSFPatientDetails
    {
        public string Address { get; set; }
        public string birthdate { get; set; }
        public string gender { get; set; }

        public string name { get; set; }
        public string family { get; set; }

        public string img { get; set; }
        public string UUID { get; set; }

        public List<List<Company>> ssfEmployerList { get; set; }
    }
}
