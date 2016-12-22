exports.render = () => {
    return `<form>
        <div class="list">
            <label class="itemm item-input item-stacked-label">
                <span class="input-label">Email</span>
                <input type="text" data-email>
            </label>
            <label class="itemm item-input item-stacked-label">
                <span class="input-label">Senha</span>
                <input type="text" data-password>
            </label>
        </div>
        <div class="padding">
            <button class="button button-positive button-block">
                <i class="ion-home"></i>Entrar
            </button>
        </div>
    </form>
    <div class="padding">
        <button class="button button-block">
            <i class="ion-person-add"></i>Cadastrar
        </button>
    </div>`;
}