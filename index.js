$(function() {
    $('#cep').mask('00000-000');
    $('#numero').mask('000000');
    $('.carousel').slick({
        autoplay: true,
        dots: true,
        adaptiveHeight: false
    })
});

ko.bindingHandlers.formatPrice = {
    update: function(element, valueAcessor) {
        let formattedPrice = '$' + valueAcessor().toFixed(2).replace('.', ',');
        $(element).text(formattedPrice);
    }
}

function CartViewModel() {
    let self = this;

    self.isReady = ko.observable(false);
    setTimeout(() => {
        self.isReady(true);
    }, 4000)
    self.availableItems = ko.observableArray([
        {
            id: 1,
            image_url: 'https://images.unsplash.com/photo-1605835963874-a7c87f56259e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80',
            name: 'PS4 Controller FOR SALE $$$',
            price: 100
        },
        {
            id: 2,
            image_url: 'https://images.unsplash.com/photo-1605899435973-ca2d1a8861cf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80',
            name: 'XBox Controller FOR SALE $$$',
            price: 150
        },
        {
            id: 3,
            image_url: 'https://images.unsplash.com/photo-1604586409773-61d0738e5aa1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8eGJveCUyMHNlcmllcyUyMHN8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
            name: 'XBOX Series S',
            price: 500
        },
        {
            id: 4,
            image_url: 'https://images.unsplash.com/photo-1507457379470-08b800bebc67?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1084&q=80',
            name: 'PlayStation 4',
            price: 550
        }
    ]);

    self.itemsInCart = ko.observableArray([]);
    self.itemsInCartFormatted = ko.computed(function() {
        let formattedValue = ` (${self.itemsInCart().length})`;
        return formattedValue;
    }, self);

    
    self.total = ko.computed(function() {
        const calculatedTotal = self.itemsInCart().reduce((total, item) => {
            total = total + item.price*item.quantity;
            return total;
        }, 0);
        return '$' + calculatedTotal.toFixed(2).replace('.', ',');;
    })

    self.addToCart = function() {
        $(`#${this.id}`).removeClass('hidden');
        console.log(this)
        const isAlreadyOnCart = self.itemsInCart().some(item => item.name === this.name);
        if(!isAlreadyOnCart) {
            self.itemsInCart.push({
                ...this,
                quantity: 1
            });
        } else {
            Swal.fire({
                title: 'Ué!',
                text: 'Você já adicionou esse item ao carrinho.',
                icon: 'error',
                confirmButtonText: 'Voltar'
              });
        }
    }

    self.changeQuantity = function() {
        const newItemArray = self.itemsInCart().map(item => {
            if(item.name === this.name) {
                item.quantity = parseInt(this.quantity);
            }
            return item;
        });
        self.itemsInCart(newItemArray);
    }

    self.addressesBook = ko.observableArray([{
        alias: 'Casa',
        cep: '50610-130',
        logradouro: 'Rua Arnaldo Bastos',
        numero: '20',
        bairro: 'Madalena',
        complemento: 'Ap 102',
        cidade: 'Recife',
        estado: 'PE',
    }]);

    self.selectedAddress = ko.observable({});

    self.alias = ko.observable("").extend({
        validation: {
            message: 'Campo obrigatório',
            validator: function(value) {
                return value.length > 2;
            }
        }
    });
    self.nome = ko.observable("").extend({
        validation: {
            message: 'Insira um nome válido',
            validator: function(value) {
                return value.length > 2;
            }
        }
    });;
    self.cep = ko.observable("").extend({
        validation: {
            message: 'CEP é obrigatório',
            validator: function(value) {
                return value.length > 2;
            }
        }
    });;
    self.logradouro = ko.observable("").extend({
        validation: {
            message: 'Campo obrigatório',
            validator: function(value) {
                return value.length > 2;
            }
        }
    });;
    self.numero = ko.observable("").extend({
        validation: {
            message: 'Insira um número válido',
            validator: function(value) {
                return value !== "";
            }
        }
    });;
    self.bairro = ko.observable("").extend({
        validation: {
            message: 'Campo obrigatório',
            validator: function(value) {
                return value.length > 2;
            }
        }
    });;
    self.complemento = ko.observable("");
    self.cidade = ko.observable("").extend({
        validation: {
            message: 'Campo obrigatório',
            validator: function(value) {
                return value.length > 2;
            }
        }
    });;
    self.estado = ko.observable("").extend({
        validation: {
            message: 'Insira a sigla do estado',
            validator: function(value) {
                return value.length === 2;
            }
        }
    });;

    self.selectedPayment = ko.observable("");

    self.addNewAddress = function() {
        var errors = ko.validation.group(self);
        if (errors().length > 0)
        {
            alert("Insira uma tarefa válida");
            errors.showAllMessages(true);

            return false;
        }

        const {alias,
            nome,
            cep,
            logradouro,
            numero,
            bairro,
            complemento,
            cidade,
            estado} = self;

        self.addressesBook.push({
            alias,
            nome,
            cep,
            logradouro,
            numero,
            bairro,
            complemento,
            cidade,
            estado,
        })
    };

    self.removeAddress = function() {
        self.addressesBook.remove(this);
    }

    self.selectAddress = function() {
        self.selectedAddress(this);
    }

    self.selectPayment = function(paymentType) {
        $('#boleto').removeClass('selected');
        $('#cartao').removeClass('selected');
        $('#pix').removeClass('selected');

        switch(paymentType) {
            case 1:
                self.selectedPayment('boleto');
                $('#boleto').addClass('selected');
                return;
            case 2:
                self.selectedPayment('cartao');
                $('#cartao').addClass('selected');
                return;
            case 3:
                self.selectedPayment('pix');
                $('#pix').addClass('selected');
                return;
            default:
                $('#boleto').removeClass('selected');
                $('#cartao').removeClass('selected');
                $('#pix').removeClass('selected');                
                self.selectedPayment('');
                return;
        }
    };

    self.finishOrder = function() {
        Swal.fire({
            title: 'Sucesso!',
            text: 'O seu pedido foi enviado, confira o seu e-mail para mais informações.',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
    }
}

$(function() {
    ko.applyBindings(new CartViewModel());
})  