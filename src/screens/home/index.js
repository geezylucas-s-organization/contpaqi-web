import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {increment, decrement} from "../../store/counterSlice";
import {connect} from "react-redux";
import {Button} from "@material-ui/core";

const Home = ({counter, increment, decrement}) => {
    return (
        <Container maxWidth="lg">
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Hello world {counter}
                </Typography>
                <Button color="primary" onClick={increment}>
                    +
                </Button>
                <Button color="primary" onClick={decrement}>
                    -
                </Button>
            </Box>
        </Container>
    );
};

const mapStateToProps = (state) => ({counter: state.counter});
const mapDispatchToProps = {increment, decrement};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
