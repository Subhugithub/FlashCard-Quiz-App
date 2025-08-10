import React, { useState } from 'react';

export default function FlashcardApp() {
    const [flashcards, setFlashcards] = useState([
        { question: 'What is the capital of France?', answer: 'Paris' },
        { question: 'What is 2 + 2?', answer: '4' },
        { question: 'Who wrote Hamlet?', answer: 'William Shakespeare' },
    ]);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [newQuestion, setNewQuestion] = useState('');
    const [newAnswer, setNewAnswer] = useState('');
    const [editMode, setEditMode] = useState(false);

    const handleNext = () => {
        setShowAnswer(false);
        setCurrentIndex((prev) => (prev + 1) % flashcards.length);
    };

    const handlePrev = () => {
        setShowAnswer(false);
        setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    };

    const handleAdd = () => {
        if (newQuestion.trim() && newAnswer.trim()) {
            setFlashcards([...flashcards, { question: newQuestion, answer: newAnswer }]);
            setNewQuestion('');
            setNewAnswer('');
        }
    };

    const handleDelete = () => {
        const updated = flashcards.filter((_, index) => index !== currentIndex);
        setFlashcards(updated);
        setCurrentIndex(0);
    };

    const handleEdit = () => {
        const updated = [...flashcards];
        updated[currentIndex] = { question: newQuestion || updated[currentIndex].question, answer: newAnswer || updated[currentIndex].answer };
        setFlashcards(updated);
        setEditMode(false);
        setNewQuestion('');
        setNewAnswer('');
    };

    return (
        <div className="flex flex-col items-center p-6 max-w-lg mx-auto bg-white rounded-2xl shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Flashcard Quiz App</h1>

            {flashcards.length > 0 && (
                <div className="border rounded-lg p-6 w-full text-center bg-gray-50">
                    <p className="text-lg font-medium">
                        {showAnswer ? flashcards[currentIndex].answer : flashcards[currentIndex].question}
                    </p>
                    <button onClick={() => setShowAnswer(!showAnswer)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
                        {showAnswer ? 'Hide Answer' : 'Show Answer'}
                    </button>
                </div>
            )}

            <div className="flex gap-4 mt-4">
                <button onClick={handlePrev} className="px-4 py-2 bg-gray-300 rounded-lg">Previous</button>
                <button onClick={handleNext} className="px-4 py-2 bg-gray-300 rounded-lg">Next</button>
            </div>

            <div className="flex gap-4 mt-4">
                <button onClick={() => setEditMode(true)} className="px-4 py-2 bg-yellow-400 rounded-lg">Edit</button>
                <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded-lg">Delete</button>
            </div>

            <div className="mt-6 w-full">
                <input
                    type="text"
                    placeholder="Question"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    className="w-full border px-3 py-2 rounded mb-2"
                />
                <input
                    type="text"
                    placeholder="Answer"
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                    className="w-full border px-3 py-2 rounded mb-2"
                />
                {editMode ? (
                    <button onClick={handleEdit} className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg">Save Changes</button>
                ) : (
                    <button onClick={handleAdd} className="w-full px-4 py-2 bg-green-500 text-white rounded-lg">Add Flashcard</button>
                )}
            </div>
        </div>
    );
}
