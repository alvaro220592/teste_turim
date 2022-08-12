<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>

        {{-- Token para fazer as requisições --}}
        <meta name="csrf-token" content="{{ csrf_token() }}">

        {{-- CSS do Bootstrap --}}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css">
        
        {{-- Bootstrap icons --}}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css">

    </head>
    <body>
        <div class="container">
            <div class="row mt-3">
                <div class="col-md-2 mb-3">
                    <button type="button" class="btn btn-primary form-control" onclick="gravar()">Gravar</button>
                </div>
                <div class="col-md-2 mb-3">
                    <button type="button" class="btn btn-primary form-control" onclick="ler()">Ler</button>
                </div>
            </div>

            {{-- Local de inserção dos dados --}}
            <div class="row">
                <div class="col-md-1">
                    <label for="name">Nome</label>
                </div>
                <div class="col-md-3">
                    <input type="text" id="name" class="form-control">
                </div>
                <div class="col-md-1">
                    <button type="button" class="btn btn-primary" onclick="incluirPessoa()">Incluir</button>
                </div>
            </div>

            {{-- Conteúdo principal --}}
            <div class="row d-flex mt-2" style="height: 70vh; overflow-y: auto;">
                {{-- seção esquerda --}}
                <section class="col-md-6">
                    <table class="table">
                        <thead>
                            <div class="text-center" style="border-bottom: 1px solid #ced4da; padding: 5px 0px">
                                Pessoas
                            </div>
                        </thead>

                        <tbody id="tbody">
                            {{-- Preenchido via JS --}}
                        </tbody>
                    </table>
                </section>

                {{-- seção direita --}}
                <section class="col-md-6">
                    <textarea id="textarea" class="form-control" cols="30" style="height: 90%" readonly>
                        {{-- Preenchido via JS --}}
                    </textarea>
                </section>
            </div>
        </div>

        {{-- JS do Bootstrap --}}
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js"></script>

        {{-- JS do sweetalert2 --}}
        <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>

        {{-- JS interno --}}
        <script src="js/scripts.js"></script>
    </body>
</html>
