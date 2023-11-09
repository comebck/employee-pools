import { _saveQuestion } from '../utils/_DATA';
import { _saveQuestionAnswer } from '../utils/_DATA';

describe('_saveQuestion', () => {
    it('saved question is returned and all expected fields are populated', async() => {
        var author = "sarahedo"
        var optionOneText = "use unix";
        var optionTwoText = "use windows";
        var question = await _saveQuestion({author, optionOneText, optionTwoText});
        expect(question.author).toEqual("sarahedo");
        expect(question.optionOne.text).toEqual("use unix");
        expect(question.optionTwo.text).toEqual("use windows");
        expect(question.id).not.toBeNull();
        expect(question.id).not.toBe('');
        expect(question.optionOne.votes).toBeInstanceOf(Array);
        expect(question.optionOne.votes).toHaveLength(0);
        expect(question.optionTwo.votes).toBeInstanceOf(Array);
        expect(question.optionTwo.votes).toHaveLength(0);
    });

    it('save question returns an error if author is not passed', async() => {
        var optionOneText = "use unix";
        var optionTwoText = "use windows";
        await expect(_saveQuestion({optionOneText, optionTwoText})).rejects.toEqual("Please provide optionOneText, optionTwoText, and author");
    });
})

describe('_saveQuestionAnswer', () => {
    it('saved question answer is returned and all expected fields are populated', async() => {
        var authedUser = "sarahedo"
        var qid = "vthrdm985a262al8qx3do";
        var answer = "optionOne";
        var answer = await _saveQuestionAnswer({authedUser, qid, answer});
        expect(answer).toEqual(true);
    });

    it('save question answer returns an error if question id is not passed', async() => {
        var authedUser = "sarahedo"
        var answer = "optionOne";
        await expect(_saveQuestionAnswer({authedUser, answer})).rejects.toEqual("Please provide authedUser, qid, and answer");
    });
})