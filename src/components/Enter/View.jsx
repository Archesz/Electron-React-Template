import React, { useState } from 'react'
import FolderSelector from '../FolderSelector/FolderSelector'
import { TbPlus } from 'react-icons/tb'
import Question from '../Question/Question';

const { ipcRenderer } = window.require('electron');

const questions = [
    { "question": "How to enter data into the software?", "response": "Boa sorte." },
    { "question": "How to add more groups to be analyzed?", "response": "Se vira" },
    { "question": "How to suggest modifications to the tool?", "response": "Se vira" },
    { "question": "What are the current limitations of the tool?", "response": "Se vira" },
    { "question": "How to add different charts?", "response": "Se vira" }
]

function openWindow() {
    ipcRenderer.send('open-window');
}

function View(props) {

    const [folders, setFolders] = useState([<FolderSelector key={1} id={1} />]);
    const [filter, setFilter] = useState("")

    function startAnalyzes() {
        let t = localStorage.getItem("folders")
        window.startThais()
        openWindow();
        console.log(t)
    }

    function handleAddButtonClick() {
        const newFolders = [
            ...folders,
            <FolderSelector key={folders.length + 1} id={folders.length + 1} />
        ];
        setFolders(newFolders);
    }

    const filteredQuestions = questions.filter((question) => {
        const questionText = question["question"].toLowerCase();
        const responseText = question["response"].toLowerCase();
        const filterText = filter.toLowerCase();

        return questionText.includes(filterText) || responseText.includes(filterText);
    });

    const handleChange = (event) => {
        setFilter(event.target.value);
    };

    if (props.type === "Input") {
        return (
            <div className='enter-right'>

                <span className='enter-name'>Enter the folders you want to perform the analysis.</span>
                <span className='enter-name'>Click in "+" for insert more groups.</span>

                <div className='folders-inputs'>

                    {folders.map((folder) => folder)}

                    <button className='add-btn' onClick={handleAddButtonClick}>
                        <TbPlus className='add-icon' />
                    </button>

                </div>

                <button className='btn-start' onClick={startAnalyzes}>Run analyzes</button>

            </div>
        )
    } else if (props.type === "Help") {
        return (
            <div className='enter-question'>

                <div className='search-field'>
                    <span className='enter-name'>Most common questions about the tool.</span>

                    <input
                        className='search-input'
                        placeholder='Ex: How insert data'
                        value={filter}
                        onChange={handleChange}
                    />
                </div>

                <div className='questions-container'>

                    {filteredQuestions.map((question, index) => (
                        <Question key={index} question={question.question} response={question.response} />
                    ))}

                </div>

            </div>
        )
    } else if (props.type === "Github") {
        return (
            <div className='news-container'>

                <span>Outras ferramentas e reposit??rios</span>

            </div>
        )
    } else if (props.type === "News") {
        return (
            <div className='news-container'>

                <span>Novas atualiza????es e ajustes</span>

            </div>
        )
    } else if (props.type === "Settings") {
        return (
            <div className='news-container'>

                <span>Configura????es</span>

            </div>
        )
    }
}

export default View