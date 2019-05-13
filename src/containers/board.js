import { connect } from 'react-redux';
import { Board } from '../components/board';

console.log(Board);

const mapStateToProps = (state) => ({
    board: state.board
});

const mapDispatchToProps = (dispatch) => ({
    "1": "1"
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Board);