const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../app'); // Replace with the actual path to your Express app file
const Goal = require('../models/goal'); // Replace with the correct path to your Goal model

chai.use(chaiHttp);
const expect = chai.expect;

describe('API Tests', () => {
  before(() => {
    // Mocking the Goal model's find and deleteOne methods
    sinon.stub(Goal, 'find');
    sinon.stub(Goal, 'deleteOne');
  });

  after(() => {
    // Restore the original methods after testing
    Goal.find.restore();
    Goal.deleteOne.restore();
  });

  it('should return a list of goals when GET /goals is called', async () => {
    const mockGoals = [{ text: 'Goal 1' }, { text: 'Goal 2' }];
    Goal.find.returns(mockGoals);

    const res = await chai.request(app).get('/api/goals');

    expect(res).to.have.status(200);
    expect(res.body.goals).to.deep.equal(mockGoals);
  });

  it('should delete a goal when DELETE /goals/:id is called', async () => {
    const goalId = '1';
    Goal.deleteOne.returns({ n: 1 }); // Simulating successful deletion

    const res = await chai.request(app).delete(`/api/goals/${goalId}`);

    expect(res).to.have.status(200);
    expect(res.body.message).to.equal('Deleted goal!');
  });
});
