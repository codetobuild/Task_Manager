
const startServer = (app)=>{
    const PORT = process.env.PORT || 5000;

    const server = app.listen(PORT, () => {
      console.log(`server started at ${PORT}`);
    });

}

module.exports = startServer;