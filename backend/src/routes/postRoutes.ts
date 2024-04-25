import express from 'express';
import Post from '../models/Post';
import requireAuth from '../middlewares/requireAuth';

const router = express.Router();

// Fetch all questions
router.get('/', async (req, res) => {
  try {
    const allQuestions = await Post.find();
    res.status(200).json(allQuestions);
  } catch (error) {
    res.status(500).json({ message: "Questions Cannot Load" });
  }
});

// Add a question
router.post('/add', requireAuth, async (req, res) => {
  const { postText } = req.body;
  const author = req.session?.user?.username;

  if (!postText) {
    return res.status(400).json({ message: "Cannot use empty question text" });
  }

  if (!author) {
    return res.status(403).json({ message: "No author found in session" });
  }

  try {
    const addedQuestion = new Post({ postText, author });
    await addedQuestion.save();
    res.status(200).json(addedQuestion);
  } catch (error) {
    res.status(500).json({ message: "Error handling adding question" });
  }
});

// // Answer a question
// router.post('/:questionId/answer', requireAuth, async (req, res) => {
//   const { questionId } = req.params;
//   const { answer } = req.body;

//   if (!answer) {
//     return res.status(400).json({ message: "Answer text must be provided" });
//   }

//   try {
//     const post = await Post.findById(questionId);

//     if (!post) {
//       return res.status(404).json({ message: "Question not found" });
//     }
//     post.comment = answer;
//     await question.save();
//     res.status(200).json(question);
//   } catch (error) {
//     res.status(500).json({ message: "Server error updating the answer" });
//   }
// });

router.get('/:questionId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.questionId);
    if (!post) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error fetching question" });
  }
});


export default router;
