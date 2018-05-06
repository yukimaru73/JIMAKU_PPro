﻿var activeSeq = app.project.activeSequence;
if (activeSeq) {
    var filterString = "";
    if (Folder.fs === 'Windows'){
        filterString = "Motion Graphics Templates:*.mogrt";
    }
    var mogrtToImport	= 	File.openDialog (	"Choose MoGRT", 	// title
                                                filterString, 					// filter available files? 
                                                false);				// allow multiple?
    if (mogrtToImport){
        var targetTime		= activeSeq.getPlayerPosition();
        var vidTrackOffset  = 1;
        var audTrackOffset	= 1;
        var newTrackItem 	= activeSeq.importMGT(	mogrtToImport.fsName, 
                                                    targetTime.ticks, 
                                                    vidTrackOffset,
                                                    audTrackOffset);
        if (newTrackItem){
            var moComp = newTrackItem.components[2];
            if (moComp){
                var params			= 	moComp.properties;
                var srcTextParam	=	params.getParamForDisplayName("ソーステキスト");
                if (srcTextParam){
                    var val	= srcTextParam.getValue();
                    srcTextParam.setValue("New value set by PProPanel!");
                }
            }
        }
    } else {
        app.setSDKEventMessage('Unable to import ' + mogrtToImport.fsName + '.', 'error');  
    }
} 