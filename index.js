$(function() {
    $('#cep').mask('00000-000');
    $('#numero').mask('000000');
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
            price: 100,
            category: 'accessories'
        },
        {
            id: 2,
            image_url: 'https://images.unsplash.com/photo-1605899435973-ca2d1a8861cf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80',
            name: 'XBox Controller FOR SALE $$$',
            price: 150,
            category: 'accessories'
        },
        {
            id: 3,
            image_url: 'https://images.unsplash.com/photo-1604586409773-61d0738e5aa1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8eGJveCUyMHNlcmllcyUyMHN8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
            name: 'XBOX Series S',
            price: 500,
            category: 'console'
        },
        {
            id: 4,
            image_url: 'https://images.unsplash.com/photo-1507457379470-08b800bebc67?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1084&q=80',
            name: 'PlayStation 4',
            price: 550,
            category: 'console'
        },
        {
            id: 5,
            image_url: 'https://images.unsplash.com/photo-1543622748-5ee7237e8565?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
            name: 'Collection Nintendo',
            price: 125.50,
            category: 'game'
        },
        {
            id: 6,
            image_url: 'https://images.unsplash.com/photo-1612404730960-5c71577fca11?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTF8fG1hcmlvfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
            name: 'Super Mario (A New Journey)',
            price: 75.90,
            category: 'game'
        },
        {
            id: 7,
            image_url: 'https://images.unsplash.com/photo-1599409636295-e3cf3538f212?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjB8fG1hcmlvfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
            name: 'Mario Kart (Remake)',
            price: 95.99,
            category: 'game'
        },
        {
            id: 8,
            image_url: 'https://images.unsplash.com/photo-1585857188938-2f7ae5afb6f8?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTR8fG5pbnRlbmRvJTIwc3dpdGNofGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
            name: 'Animal Crossing',
            price: 45.90,
            category: 'game'
        },
        {
            id: 9,
            image_url: 'https://images.unsplash.com/photo-1612036781124-847f8939b154?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NXx8bmludGVuZG8lMjBzd2l0Y2h8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
            name: 'Nintendo Switch',
            price: 350.95,
            category: 'console'
        },
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

    self.removeItem = function() {
        self.itemsInCart.remove(this);
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
            Swal.fire({
                title: 'Ops...',
                text: 'Os campos marcados com (*) são obrigatórios.',
                icon: 'error',
                confirmButtonText: 'Voltar'
              });
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
        });
        Swal.fire({
            title: 'Sucesso!',
            text: 'Endereço adicionado com sucesso.',
            icon: 'success',
            confirmButtonText: 'Ok'
          }).then((result) => {
            if (result.isConfirmed) {
              window.location = window.location.pathname;
            }
          });
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
        window.open(`https://wa.me/5581998300867/?text=Oi,%20tudo%20bem?%20Gostaria%20de%20fazer%20o%20pedido%20dos%20itens:%20${self.itemsInCart().map(item => {return `${item.name} (${item.quantity}x$${item.price}: $${item.quantity*item.price})`})}.%20Endereco:%20${self.selectedAddress().logradouro},%20${self.selectedAddress().numero},%20${self.selectedAddress().complemento},%20${self.selectedAddress().bairro},%20${self.selectedAddress().cidade}-${self.selectedAddress().estado},%20${self.selectedAddress().cep}.%20Forma%20de%20pagamento:%20${self.selectedPayment()}`)
        Swal.fire({
            title: 'Sucesso!',
            text: 'O seu pedido foi enviado, confira o seu e-mail para mais informações.',
            icon: 'success',
            confirmButtonText: 'Ok'
          }).then((result) => {
            if (result.isConfirmed) {
              window.location = window.location.pathname;
            }
          });
    }
}

$(function() {
    ko.applyBindings(new CartViewModel());
})  