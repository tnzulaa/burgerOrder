import React, { Component } from 'react';
import Burger from '../../components/Burger';
import BuildControls from '../../components/BuildControls';
import Modal from '../../components/General/Modal';
import OrderSummary from '../../components/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/General/Spinner';


class BurgerPage extends Component{    
    state = {       
        confirmOrder: false,
    }

   continueOrder = () => {
       this.props.history.push('/ship');
       this.closeConfirmModal();        
    }

    showConfirmModal = () => {
        this.setState({confirmOrder: true});
    };

    closeConfirmModal = () => {
        this.setState({confirmOrder: false});
    }

   
    render(){       
        return (
            <div>
                <Modal 
                        closeConfirmModal={this.closeConfirmModal} 
                        show={this.state.confirmOrder}>
                {this.state.loading ? <Spinner/> : <OrderSummary 
                        onCancel={this.closeConfirmModal}
                        onContinue={this.continueOrder}/>}
                    
                </Modal>                
                <Burger />
                <BuildControls 
                    showConfirmModal={this.showConfirmModal}
                    ortsNemeh={this.props.burgertOrtsNem} 
                    ortsHasah={this.props.burgereesOrtsHas} 
                />      

            </div>
            
        );
    }
}

export default BurgerPage;