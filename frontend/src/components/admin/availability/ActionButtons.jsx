function ActionButtons({

    saveDraft,

    publishSchedule,

}) {

    return (

        <div

            style={{

                display:"flex",

                justifyContent:"flex-end",

                gap:"20px",

                marginTop:"30px"

            }}

        >

            <button

                onClick={saveDraft}

                style={draftBtn}

            >

                💾 Save Draft

            </button>

            <button

                onClick={publishSchedule}

                style={publishBtn}

            >

                🚀 Publish Schedule

            </button>

        </div>

    );

}

const draftBtn={

    padding:"15px 30px",

    background:"white",

    border:"2px solid #47685F",

    color:"#47685F",

    borderRadius:"10px",

    cursor:"pointer",

    fontSize:"16px",

    fontWeight:"600"

};

const publishBtn={

    padding:"15px 30px",

    background:"#47685F",

    color:"white",

    border:"none",

    borderRadius:"10px",

    cursor:"pointer",

    fontSize:"16px",

    fontWeight:"600"

};

export default ActionButtons;