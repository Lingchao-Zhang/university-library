const HighFrequencyVisit = () => {
    return(
        <section className="container">
            <div className="min-h-screen flex justify-center items-center">
                <h1 className="text-30-semibold-light-100">
                    You have visited the page too many times in one minute.
                    <br/>
                    Take a cup of coffee and have a rest.
                </h1>
            </div>
        </section>
    )
}

export default HighFrequencyVisit