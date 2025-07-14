import Task from '../models/task.js';

// Handle task creation
export const createTask = async (req, res) => {
  const { title, content } = req.body;

  // Check if user is logged in
  if (!req.session.user) {
    return res.redirect('/login');
  }

  try {
    const newTask = new Task({
      title,
      content,
      user: req.session.user._id // associate task with current user
    });

    await newTask.save();

    console.log("✅ Task created for:", req.session.user.username);
    res.redirect('/tasks'); // redirect to all tasks
  } catch (err) {
    console.error("❌ Error creating task:", err);
    res.status(500).send('Something went wrong while creating the task.');
  }
};






export const getUserTasks = async (req, res) => {
  try {
    // Only fetch tasks created by this logged-in user
    const tasks = await Task.find({ user: req.session.user._id });

    res.render('task', {
      user: req.session.user,
      tasks
    });
  } catch (err) {
    console.error("❌ Error loading tasks:", err);
    res.status(500).send('Something went wrong loading your tasks.');
  }
};



// Render edit form
export const getEditForm = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.session.user._id });
    if (!task) return res.status(404).send('Task not found');

    res.render('edit-task', { task });
  } catch (err) {
    console.error("❌ Error loading edit form:", err);
    res.status(500).send('Internal Server Error');
  }
};

// Handle POST edit
export const postEditTask = async (req, res) => {
  const { title, content } = req.body;
  try {
    await Task.updateOne(
      { _id: req.params.id, user: req.session.user._id },
      { $set: { title, content } }
    );
    res.redirect('/tasks');
  } catch (err) {
    console.error("❌ Error editing task:", err);
    res.status(500).send('Failed to update task');
  }
};

// Handle Delete
export const deleteTask = async (req, res) => {
  try {
    await Task.deleteOne({ _id: req.params.id, user: req.session.user._id });
    res.redirect('/tasks');
  } catch (err) {
    console.error("❌ Error deleting task:", err);
    res.status(500).send('Failed to delete task');
  }
};

