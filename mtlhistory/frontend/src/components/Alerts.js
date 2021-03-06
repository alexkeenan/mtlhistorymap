import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Alerts extends Component {

    static propTypes = {
        error: PropTypes.object.isRequired,
        message: PropTypes.object.isRequired
    };
    componentDidUpdate(prevProps) {
        const { error, alert, message } = this.props;
        if (error !== prevProps.error) {
            if (error.msg.name) alert.error(`Name: ${error.msg.name.join()}`);
            if (error.msg.email) alert.error(`Email: ${error.msg.email.join()}`);
            if (error.msg.message)
                alert.error(`Message: ${error.msg.message.join()}`);
            if (error.msg.non_field_errors)
                alert.error(error.msg.non_field_errors.join());
            if (error.msg.username) alert.error(error.msg.username.join());
            if (error.msg.title) alert.error(error.msg.title.join());
            if (error.msg.dateofmemory) alert.error("date missing or in wrong format. Should be mm/dd/yyyy");
            if (error.msg.photo) alert.error(error.msg.photo.join());
            if (error.msg.category) alert.error("please select a category");

        }

        if (message !== prevProps.message) {
            if (message.deleteMemory) alert.success(message.deleteMemory);
            if (message.addMemory) alert.success(message.addMemory);
            if (message.passwordNotMatch) alert.error(message.passwordNotMatch);
            if (message.notVerified) alert.error(message.notVerified);
        }
    }


    render() {
        return <Fragment />;
    }
}



const mapStateToProps = state => ({
    error: state.errors,
    message: state.messages
});

export default connect(mapStateToProps)(withAlert(Alerts));



//export default withAlert(Alerts)