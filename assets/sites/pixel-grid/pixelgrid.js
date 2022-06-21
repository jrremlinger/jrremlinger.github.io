//I'll work on adding proper comments explaining how it works eventually.
//Until then, id appreciate any feedback or questions!

var speed = 500;
var isStopped = true;
var looper;
var showBorder = true;
var swapBr = false;
var rng;
var grabOn = false;
var undoCol;
var undoCol2;
var undoCol3;
var undoCol4;
var undoCol5;
var undoCol6;
var undoCol7;
var undoCol8;
var undoCol9;
var undoPix = "empty";
var undoPix2 = "empty";
var undoPix3 = "empty";
var undoPix4 = "empty";
var undoPix5 = "empty";
var undoPix6 = "empty";
var undoPix7 = "empty";
var undoPix8 = "empty";
var undoPix9 = "empty";
var redoCol;
var redoCol2;
var redoCol3;
var redoCol4;
var redoCol5;
var redoCol6;
var redoCol7;
var redoCol8;
var redoCol9;

function init()
{
	var slider = document.getElementById("myRange");

	slider.onchange = function()
	{
		speed = slider.value;
	
		if (isStopped == false)
		{
			clearInterval(looper);
			looper = setInterval("trigger()", speed);
		}
	}
}

function noise()
{
	for (i=1;i<=256;i++)
	{
		rng = Math.floor(Math.random() * 3);

		if (rng == 0)
			var col = "#000000";
		else if (rng == 1)
			col = "#FFFFFF";
		else
			col = "";

		document.getElementById("pixel" + i).style.backgroundColor = col;
	}
}

function borderToggle()
{
	pixelz = document.getElementsByClassName("pixel");
	
	if (showBorder == true)
	{
		showBorder = !showBorder;
		document.getElementById("bord").style.backgroundColor = "red";

		for (i=0;i<pixelz.length;i++)
		{
			pixelz[i].style.border = "0px black solid";
		}
	}
	else
	{
		showBorder = !showBorder;
		document.getElementById("bord").style.backgroundColor = "lime";

		for (i=0;i<pixelz.length;i++)
		{
			pixelz[i].style.border = "1px black solid";
		}
	}
}

function brushToggle()
{
	if (swapBr == false)
	{
		swapBr = !swapBr;
		document.getElementById("bru").style.backgroundColor = "lime";
	}
	else
	{
		swapBr = !swapBr;
		document.getElementById("bru").style.backgroundColor = "red";
	}
}

function playPause()
{
	if (isStopped == true)
	{
		isStopped = !isStopped;
		looper = setInterval("trigger()", speed);
	}
	else
	{
		isStopped = !isStopped;
		clearInterval(looper);
	}
}

function getRng()
{
	rng = "#" + Math.floor(Math.random() * 1000000)
	return rng;
}

function trigger()
{
	for (i=1;i<=256;i++)
	{
		document.getElementById("pixel" + i).style.backgroundColor = getRng();
	}
}

function colorPix(pix)
{
	if (document.getElementById("size").value == 1 && swapBr == false && grabOn == false)
	{
	    undoCol = document.getElementById("pixel" + pix).style.backgroundColor;
	    undoPix = pix;
	    undoPix2 = "empty";
	    undoPix3 = "empty";
	    undoPix4 = "empty";
	    undoPix5 = "empty";
	    undoPix6 = "empty";
	    undoPix7 = "empty";
	    undoPix8 = "empty";
	    undoPix9 = "empty";
		document.getElementById("pixel" + pix).style.backgroundColor = document.getElementById("col").value;
	}
	else if (document.getElementById("size").value == 2 && swapBr == false && grabOn == false)
	{
		if (pix<16 && pix>1)
		{
            undoCol = document.getElementById("pixel" + pix).style.backgroundColor;
	        undoPix = pix;
	        undoCol2 = document.getElementById("pixel" + (pix + 1)).style.backgroundColor;
	        undoPix2 = pix + 1;
	        undoCol3 = document.getElementById("pixel" + (pix - 1)).style.backgroundColor;
	        undoPix3 = pix - 1;
	        undoCol4 = document.getElementById("pixel" + (pix + 16)).style.backgroundColor;
	        undoPix4 = pix + 16;
	        undoPix5 = "empty";
	        undoCol6 = document.getElementById("pixel" + (pix + 15)).style.backgroundColor;
	        undoPix6 = pix + 15;
	        undoPix7 = "empty";
	        undoCol8 = document.getElementById("pixel" + (pix + 17)).style.backgroundColor;
	        undoPix8 = pix + 17;
	        undoPix9 = "empty";

			document.getElementById("pixel" + pix).style.backgroundColor = document.getElementById("col").value;
			document.getElementById("pixel" + (pix + 1)).style.backgroundColor = document.getElementById("col").value;
			document.getElementById("pixel" + (pix - 1)).style.backgroundColor = document.getElementById("col").value;
			document.getElementById("pixel" + (pix + 16)).style.backgroundColor = document.getElementById("col").value;
			document.getElementById("pixel" + (pix + 15)).style.backgroundColor = document.getElementById("col").value;
			document.getElementById("pixel" + (pix + 17)).style.backgroundColor = document.getElementById("col").value;
		}
		else if (pix<256 && pix>241)
		{
		    undoCol = document.getElementById("pixel" + pix).style.backgroundColor;
	        undoPix = pix;
	        undoCol2 = document.getElementById("pixel" + (pix + 1)).style.backgroundColor;
	        undoPix2 = pix + 1;
	        undoCol3 = document.getElementById("pixel" + (pix - 1)).style.backgroundColor;
	        undoPix3 = pix - 1;
	        undoPix4 = "empty";
	        undoCol5 = document.getElementById("pixel" + (pix - 16)).style.backgroundColor;
	        undoPix5 = pix - 16;
	        undoPix6 = "empty";
	        undoCol7 = document.getElementById("pixel" + (pix - 15)).style.backgroundColor;
	        undoPix7 = pix - 15;
	        undoPix8 = "empty";
	        undoCol9 = document.getElementById("pixel" + (pix - 17)).style.backgroundColor;
	        undoPix9 = pix - 17;
	        
			document.getElementById("pixel" + pix).style.backgroundColor = document.getElementById("col").value;
			document.getElementById("pixel" + (pix + 1)).style.backgroundColor = document.getElementById("col").value;
			document.getElementById("pixel" + (pix - 1)).style.backgroundColor = document.getElementById("col").value;
			document.getElementById("pixel" + (pix - 16)).style.backgroundColor = document.getElementById("col").value;
			document.getElementById("pixel" + (pix - 15)).style.backgroundColor = document.getElementById("col").value;
			document.getElementById("pixel" + (pix - 17)).style.backgroundColor = document.getElementById("col").value;
		}
		else if (pix == 1)
		{
		    undoCol = document.getElementById("pixel" + pix).style.backgroundColor;
	        undoPix = pix;
	        undoCol2 = document.getElementById("pixel" + (pix + 1)).style.backgroundColor;
	        undoPix2 = pix + 1;
	        undoPix3 = "empty";
	        undoCol4 = document.getElementById("pixel" + (pix + 16)).style.backgroundColor;
	        undoPix4 = pix + 16;
	        undoPix5 = "empty";
	        undoPix6 = "empty";
	        undoPix7 = "empty";
	        undoCol8 = document.getElementById("pixel" + (pix + 17)).style.backgroundColor;
	        undoPix8 = pix + 17;
	        undoPix9 = "empty";
	        
			document.getElementById("pixel" + pix).style.backgroundColor = document.getElementById("col").value;
			document.getElementById("pixel" + (pix + 1)).style.backgroundColor = document.getElementById("col").value;
			document.getElementById("pixel" + (pix + 16)).style.backgroundColor = document.getElementById("col").value;
			document.getElementById("pixel" + (pix + 17)).style.backgroundColor = document.getElementById("col").value;
		}
		else if (pix == 16)
		{
		    undoCol = document.getElementById("pixel" + pix).style.backgroundColor;
	        undoPix = pix;
	        undoPix2 = "empty";
	        undoCol3 = document.getElementById("pixel" + (pix - 1)).style.backgroundColor;
	        undoPix3 = pix - 1;
	        undoCol4 = document.getElementById("pixel" + (pix + 16)).style.backgroundColor;
	        undoPix4 = pix + 16;
	        undoPix5 = "empty";
	        undoCol6 = document.getElementById("pixel" + (pix + 15)).style.backgroundColor;
	        undoPix6 = pix + 15;
	        undoPix7 = "empty";
	        undoPix8 = "empty";
	        undoPix9 = "empty";
	        
			document.getElementById("pixel" + pix).style.backgroundColor = document.getElementById("col").value;
			document.getElementById("pixel" + (pix - 1)).style.backgroundColor = document.getElementById("col").value;
			document.getElementById("pixel" + (pix + 16)).style.backgroundColor = document.getElementById("col").value;
			document.getElementById("pixel" + (pix + 15)).style.backgroundColor = document.getElementById("col").value;
		}
		else if (pix == 241)
		{
		    undoCol = document.getElementById("pixel" + pix).style.backgroundColor;
	        undoPix = pix;
	        undoCol2 = document.getElementById("pixel" + (pix + 1)).style.backgroundColor;
	        undoPix2 = pix + 1;
	        undoPix3 = "empty";
	        undoPix4 = "empty";
	        undoCol5 = document.getElementById("pixel" + (pix - 16)).style.backgroundColor;
	        undoPix5 = pix - 16;
	        undoPix6 = "empty";
	        undoPix7 = "empty";
	        undoPix8 = "empty";
	        undoCol9 = document.getElementById("pixel" + (pix - 15)).style.backgroundColor;
	        undoPix9 = pix - 15;
	        
			document.getElementById("pixel" + pix).style.backgroundColor = document.getElementById("col").value;
			document.getElementById("pixel" + (pix + 1)).style.backgroundColor = document.getElementById("col").value;
			document.getElementById("pixel" + (pix - 16)).style.backgroundColor = document.getElementById("col").value;
			document.getElementById("pixel" + (pix - 15)).style.backgroundColor = document.getElementById("col").value;
		}
		else if (pix == 256)
		{
		    undoCol = document.getElementById("pixel" + pix).style.backgroundColor;
	        undoPix = pix;
	        undoPix2 = "empty";
	        undoCol3 = document.getElementById("pixel" + (pix - 1)).style.backgroundColor;
	        undoPix3 = pix - 1;
	        undoPix4 = "empty";
	        undoCol5 = document.getElementById("pixel" + (pix - 16)).style.backgroundColor;
	        undoPix5 = pix - 16;
	        undoPix6 = "empty";
	        undoPix7 = "empty";
	        undoPix8 = "empty";
	        undoCol9 = document.getElementById("pixel" + (pix - 17)).style.backgroundColor;
	        undoPix9 = pix - 17;
	        
			document.getElementById("pixel" + pix).style.backgroundColor = document.getElementById("col").value;
			document.getElementById("pixel" + (pix - 1)).style.backgroundColor = document.getElementById("col").value;
			document.getElementById("pixel" + (pix - 16)).style.backgroundColor = document.getElementById("col").value;
			document.getElementById("pixel" + (pix - 17)).style.backgroundColor = document.getElementById("col").value;
		}
		else if (pix==17||pix==33||pix==49||pix==65||pix==81||pix==97||pix==113)
		{
		    undoCol = document.getElementById("pixel" + pix).style.backgroundColor;
	        undoPix = pix;
	        undoCol2 = document.getElementById("pixel" + (pix + 1)).style.backgroundColor;
	        undoPix2 = pix + 1;
	        undoPix3 = "empty";
	        undoCol4 = document.getElementById("pixel" + (pix + 16)).style.backgroundColor;
	        undoPix4 = pix + 16;
	        undoCol5 = document.getElementById("pixel" + (pix - 16)).style.backgroundColor;
	        undoPix5 = pix - 16;
	        undoPix6 = "empty";
	        undoCol7 = document.getElementById("pixel" + (pix - 15)).style.backgroundColor;
	        undoPix7 = pix - 15;
	        undoCol8 = document.getElementById("pixel" + (pix + 17)).style.backgroundColor;
	        undoPix8 = pix + 17;
	        undoPix9 = "empty";
	        
			document.getElementById("pixel" + pix).style.backgroundColor = document.getElementById("col").value;
			document.getElementById("pixel" + (pix + 1)).style.backgroundColor = document.getElementById("col").value;
			document.getElementById("pixel" + (pix + 16)).style.backgroundColor = document.getElementById("col").value;
			document.getElementById("pixel" + (pix - 16)).style.backgroundColor = document.getElementById("col").value;
			document.getElementById("pixel" + (pix - 15)).style.backgroundColor = document.getElementById("col").value;
			document.getElementById("pixel" + (pix + 17)).style.backgroundColor = document.getElementById("col").value;
		}
		else if (pix==129||pix==145||pix==161||pix==177||pix==193||pix==209||pix==225)
		{
		    undoCol = document.getElementById("pixel" + pix).style.backgroundColor;
	        undoPix = pix;
	        undoCol2 = document.getElementById("pixel" + (pix + 1)).style.backgroundColor;
	        undoPix2 = pix + 1;
	        undoPix3 = "empty";
	        undoCol4 = document.getElementById("pixel" + (pix + 16)).style.backgroundColor;
	        undoPix4 = pix + 16;
	        undoCol5 = document.getElementById("pixel" + (pix - 16)).style.backgroundColor;
	        undoPix5 = pix - 16;
	        undoPix6 = "empty";
	        undoCol7 = document.getElementById("pixel" + (pix - 15)).style.backgroundColor;
	        undoPix7 = pix - 15;
	        undoCol8 = document.getElementById("pixel" + (pix + 17)).style.backgroundColor;
	        undoPix8 = pix + 17;
	        undoPix9 = "empty";
	        
			document.getElementById("pixel" + pix).style.backgroundColor = document.getElementById("col").value;
			document.getElementById("pixel" + (pix + 1)).style.backgroundColor = document.getElementById("col").value;
			document.getElementById("pixel" + (pix + 16)).style.backgroundColor = document.getElementById("col").value;
			document.getElementById("pixel" + (pix - 16)).style.backgroundColor = document.getElementById("col").value;
			document.getElementById("pixel" + (pix - 15)).style.backgroundColor = document.getElementById("col").value;
			document.getElementById("pixel" + (pix + 17)).style.backgroundColor = document.getElementById("col").value;
		}
		else if (pix==32||pix==48||pix==64||pix==80||pix==96||pix==112||pix==128)
		{
		    undoCol = document.getElementById("pixel" + pix).style.backgroundColor;
	        undoPix = pix;
	        undoPix2 = "empty";
	        undoCol3 = document.getElementById("pixel" + (pix - 1)).style.backgroundColor;
	        undoPix3 = pix - 1;
	        undoCol4 = document.getElementById("pixel" + (pix + 16)).style.backgroundColor;
	        undoPix4 = pix + 16;
	        undoCol5 = document.getElementById("pixel" + (pix - 16)).style.backgroundColor;
	        undoPix5 = pix - 16;
	        undoCol6 = document.getElementById("pixel" + (pix + 15)).style.backgroundColor;
	        undoPix6 = pix + 15;
	        undoPix7 = "empty";
	        undoPix8 = "empty";
	        undoCol9 = document.getElementById("pixel" + (pix - 17)).style.backgroundColor;
	        undoPix9 = pix - 17;
	        
			document.getElementById("pixel" + pix).style.backgroundColor = document.getElementById("col").value;
			document.getElementById("pixel" + (pix - 1)).style.backgroundColor = document.getElementById("col").value;
			document.getElementById("pixel" + (pix + 16)).style.backgroundColor = document.getElementById("col").value;
			document.getElementById("pixel" + (pix - 16)).style.backgroundColor = document.getElementById("col").value;
			document.getElementById("pixel" + (pix + 15)).style.backgroundColor = document.getElementById("col").value;
			document.getElementById("pixel" + (pix - 17)).style.backgroundColor = document.getElementById("col").value;
		}
		else if (pix==144||pix==160||pix==176||pix==192||pix==208||pix==224||pix==240)
		{
		    undoCol = document.getElementById("pixel" + pix).style.backgroundColor;
	        undoPix = pix;
	        undoPix2 = "empty";
	        undoCol3 = document.getElementById("pixel" + (pix - 1)).style.backgroundColor;
	        undoPix3 = pix - 1;
	        undoCol4 = document.getElementById("pixel" + (pix + 16)).style.backgroundColor;
	        undoPix4 = pix + 16;
	        undoCol5 = document.getElementById("pixel" + (pix - 16)).style.backgroundColor;
	        undoPix5 = pix - 16;
	        undoCol6 = document.getElementById("pixel" + (pix + 15)).style.backgroundColor;
	        undoPix6 = pix + 15;
	        undoPix7 = "empty";
	        undoPix8 = "empty";
	        undoCol9 = document.getElementById("pixel" + (pix - 17)).style.backgroundColor;
	        undoPix9 = pix - 17;
	        
			document.getElementById("pixel" + pix).style.backgroundColor = document.getElementById("col").value;
			document.getElementById("pixel" + (pix - 1)).style.backgroundColor = document.getElementById("col").value;
			document.getElementById("pixel" + (pix + 16)).style.backgroundColor = document.getElementById("col").value;
			document.getElementById("pixel" + (pix - 16)).style.backgroundColor = document.getElementById("col").value;
			document.getElementById("pixel" + (pix + 15)).style.backgroundColor = document.getElementById("col").value;
			document.getElementById("pixel" + (pix - 17)).style.backgroundColor = document.getElementById("col").value;
		}
		else
		{
		    undoCol = document.getElementById("pixel" + pix).style.backgroundColor;
	        undoPix = pix;
	        undoCol2 = document.getElementById("pixel" + (pix + 1)).style.backgroundColor;
	        undoPix2 = pix + 1;
	        undoCol3 = document.getElementById("pixel" + (pix - 1)).style.backgroundColor;
	        undoPix3 = pix - 1;
	        undoCol4 = document.getElementById("pixel" + (pix + 16)).style.backgroundColor;
	        undoPix4 = pix + 16;
	        undoCol5 = document.getElementById("pixel" + (pix - 16)).style.backgroundColor;
	        undoPix5 = pix - 16;
	        undoCol6 = document.getElementById("pixel" + (pix + 15)).style.backgroundColor;
	        undoPix6 = pix + 15;
	        undoCol7 = document.getElementById("pixel" + (pix - 15)).style.backgroundColor;
	        undoPix7 = pix - 15;
	        undoCol8 = document.getElementById("pixel" + (pix + 17)).style.backgroundColor;
	        undoPix8 = pix + 17;
	        undoCol9 = document.getElementById("pixel" + (pix - 17)).style.backgroundColor;
	        undoPix9 = pix - 17;
	
			document.getElementById("pixel" + pix).style.backgroundColor = document.getElementById("col").value;
			document.getElementById("pixel" + (pix + 1)).style.backgroundColor = document.getElementById("col").value;
			document.getElementById("pixel" + (pix - 1)).style.backgroundColor = document.getElementById("col").value;
			document.getElementById("pixel" + (pix + 16)).style.backgroundColor = document.getElementById("col").value;
			document.getElementById("pixel" + (pix - 16)).style.backgroundColor = document.getElementById("col").value;
			document.getElementById("pixel" + (pix + 15)).style.backgroundColor = document.getElementById("col").value;
			document.getElementById("pixel" + (pix - 15)).style.backgroundColor = document.getElementById("col").value;
			document.getElementById("pixel" + (pix + 17)).style.backgroundColor = document.getElementById("col").value;
			document.getElementById("pixel" + (pix - 17)).style.backgroundColor = document.getElementById("col").value;
		}
	}
	
	else if (swapBr == true && grabOn == false)
	{
		var selColor = document.getElementById("pixel" + pix).style.backgroundColor;

		for (i=1;i<=256;i++)
		{
			compPix = document.getElementById("pixel" + i);

			if (selColor.toUpperCase() == compPix.style.backgroundColor.toUpperCase())
			{
				compPix.style.backgroundColor = document.getElementById("col").value;
			}
		}
	}
	else if (grabOn == true)
	{
	    var selColor = document.getElementById("pixel" + pix).style.backgroundColor;
	    document.getElementById("col").value = selColor.toUpperCase();
	}
}

function clearGrid()
{
  	for (i=1;i<=256;i++)
	{
		document.getElementById("pixel" + i).style.backgroundColor = "";
	}
}

function grab()
{
    if (grabOn == true)
	{
		grabOn = !grabOn;
		document.getElementById("grb").style.backgroundColor = "red";
	}
	else
	{
		grabOn = !grabOn;
		document.getElementById("grb").style.backgroundColor = "lime";
	}
}

function undo()
{
    if (undoPix != "empty")
    {
        redoCol = document.getElementById("pixel" + undoPix).style.backgroundColor;
        document.getElementById("pixel" + undoPix).style.backgroundColor = undoCol;
    }
    if (undoPix2 != "empty")
    {
        redoCol2 = document.getElementById("pixel" + undoPix2).style.backgroundColor;
        document.getElementById("pixel" + undoPix2).style.backgroundColor = undoCol2;
    }
    if (undoPix3 != "empty")
    {
        redoCol3 = document.getElementById("pixel" + undoPix3).style.backgroundColor;
        document.getElementById("pixel" + undoPix3).style.backgroundColor = undoCol3;
    }
    if (undoPix4 != "empty")
    {
        redoCol4 = document.getElementById("pixel" + undoPix4).style.backgroundColor;
        document.getElementById("pixel" + undoPix4).style.backgroundColor = undoCol4;
    }
    if (undoPix5 != "empty")
    {
        redoCol5 = document.getElementById("pixel" + undoPix5).style.backgroundColor;
        document.getElementById("pixel" + undoPix5).style.backgroundColor = undoCol5;
    }
    if (undoPix6 != "empty")
    {
        redoCol6 = document.getElementById("pixel" + undoPix6).style.backgroundColor;
        document.getElementById("pixel" + undoPix6).style.backgroundColor = undoCol6;
    }
    if (undoPix7 != "empty")
    {
        redoCol7 = document.getElementById("pixel" + undoPix7).style.backgroundColor;
        document.getElementById("pixel" + undoPix7).style.backgroundColor = undoCol7;
    }
    if (undoPix8 != "empty")
    {
        redoCol8 = document.getElementById("pixel" + undoPix8).style.backgroundColor;
        document.getElementById("pixel" + undoPix8).style.backgroundColor = undoCol8;
    }
    if (undoPix9 != "empty")
    {
        redoCol9 = document.getElementById("pixel" + undoPix9).style.backgroundColor;
        document.getElementById("pixel" + undoPix9).style.backgroundColor = undoCol9;
    }
}

function redo()
{
    if (undoPix != "empty")
        document.getElementById("pixel" + undoPix).style.backgroundColor = redoCol;
    if (undoPix2 != "empty")
        document.getElementById("pixel" + undoPix2).style.backgroundColor = redoCol2;
    if (undoPix3 != "empty")
        document.getElementById("pixel" + undoPix3).style.backgroundColor = redoCol3;
    if (undoPix4 != "empty")
        document.getElementById("pixel" + undoPix4).style.backgroundColor = redoCol4;
    if (undoPix5 != "empty")
        document.getElementById("pixel" + undoPix5).style.backgroundColor = redoCol5;
    if (undoPix6 != "empty")
        document.getElementById("pixel" + undoPix6).style.backgroundColor = redoCol6; 
    if (undoPix7 != "empty")
        document.getElementById("pixel" + undoPix7).style.backgroundColor = redoCol7;
    if (undoPix8 != "empty")
        document.getElementById("pixel" + undoPix8).style.backgroundColor = redoCol8;
    if (undoPix9 != "empty")
        document.getElementById("pixel" + undoPix9).style.backgroundColor = redoCol9;
}