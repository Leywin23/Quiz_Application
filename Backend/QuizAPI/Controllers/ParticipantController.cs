using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizAPI.Data;
using QuizAPI.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace QuizAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParticipantController : ControllerBase
    {
        private readonly QuizDbContext _context;

        public ParticipantController(QuizDbContext context)
        {
            _context = context;
        }

        // GET: api/<ValuesController>
        [HttpGet]
        public async Task<ActionResult<Participant>> GetAllParticipant()
        {
            var participants = await _context.Participants
                .OrderByDescending(p=>p.Score)
                .ThenBy(p=>p.TimeTaken)
                .Take(10)
                .ToListAsync();
            return Ok(participants);
        }

        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<ValuesController>
        [HttpPost]
        public async Task<ActionResult<Participant>> PostParticipant(Participant participant)
        {
            var temp = _context.Participants.Where(x => x.Name == participant.Name).FirstOrDefault();

            if (temp == null) {
                _context.Participants.Add(participant);
                await _context.SaveChangesAsync();
            }
            else
            {
                participant = temp;
            }
            return Ok(participant);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUserScore(int id, [FromBody] Participant updated)
        {
            if (id != updated.ParticipantId)
            {
                return BadRequest("ID in URL does not match Participant ID in body.");
            }

            var user = await _context.Participants.FindAsync(id);
            if (user == null)
            {
                return NotFound("Participant not found.");
            }
            user.Score = updated.Score;
            user.TimeTaken = updated.TimeTaken;

            _context.Update(user);
            await _context.SaveChangesAsync();
            return Ok(user);
        }
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
