package com.highfive.momentrip;

import android.app.Dialog;
import android.content.Context;
import android.view.Window;
import android.widget.NumberPicker;
import android.widget.TextView;

public class AlbumpickerDialog {

    private Context context;

    public AlbumpickerDialog(Context context) {
        this.context = context;
    }

    // 호출할 다이얼로그 함수를 정의한다.
    public void showAlbumPickerDialog(TextView selectedAlbum, String[] albums) {
        Dialog dialog = new Dialog(context);

        // 액티비티의 타이틀바를 숨긴다.
        dialog.requestWindowFeature(Window.FEATURE_NO_TITLE);
        // 커스텀 다이얼로그의 레이아웃을 설정한다.
        dialog.setContentView(R.layout.dialog_album_picker);
        // 커스텀 다이얼로그를 노출한다.
        dialog.show();

        // 커스텀 다이얼로그의 각 위젯들을 정의한다.
        final NumberPicker picker = (NumberPicker) dialog.findViewById(R.id.picker);
        picker.setMinValue(0);
        picker.setMaxValue(albums.length-1);
        picker.setDisplayedValues(albums);

//        final Button okButton = (Button) dialog.findViewById(R.id.okButton);
//        final Button cancelButton = (Button) dlg.findViewById(R.id.cancelButton);

//        okButton.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View view) {
//                // '확인' 버튼 클릭시 메인 액티비티에서 설정한 main_label에
//                // 커스텀 다이얼로그에서 입력한 메시지를 대입한다.
//                selectedAlbum.setText(String.valueOf(picker.getValue()));
//
//                // 커스텀 다이얼로그를 종료한다.
//                dialog.dismiss();
//            }
//        });
//        cancelButton.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View view) {
//                Toast.makeText(context, "취소 했습니다.", Toast.LENGTH_SHORT).show();
//
//                // 커스텀 다이얼로그를 종료한다.
//                dialog.dismiss();
//            }
//        });
    }

}
