<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  
  <div class="container-fluid">
    <label class="text-white me-3 border-end pe-2 controls-sm d-none">BPM:
      <span class="ms-1">
        <i class="fa fa-minus bpm-minus"></i>
        <input type="text" value="120" class="bpm-input" />
        <i class="fa fa-plus bpm-plus"></i>
      </span>
    </label>
    <label class="text-white pe-2 border-end controls-sm d-none">
            Beat: <input type="text" value="4" class="ts-top ms-1" id="ts-top" />
          </label>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item controls-sm d-none pt-3 text-center">
          <div class="cont-controls text-white form-check d-none">
            <input type="checkbox" id="timer-check" />
            <label for="timer-check"></label>
            
            Timer: <input type="text" value="60" class="timer ms-1" />
          </div>
        </li>
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="index.php">Lista BPS <i class="fa fa-home"></i></a>
        </li>
        <!--<li class="nav-item">
          <a class="nav-link" href="notas.php">Notas</a>
        </li>
        <li class="nav-item h">
          <a class="nav-link" href="himnos.php">Himnos</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="logout.php">Salir <i class="fa fa-sign-out"></i></a>
        </li>-->
      </ul>
    </div>
  </div>
</nav>