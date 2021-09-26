package com.highfive.momentrip;

import android.content.Context;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

public class RealPFragment extends Fragment {
//    MainActivity activity; // MainActivity와 연동

    //액티비티에 대한 참조 얻기 = 프래그먼트가 액티비티로 올라오는 순간의 메소드임!
    @Override
    public void onAttach(Context context) {
        super.onAttach(context);

//        activity = (MainActivity) getActivity();

    }

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        ViewGroup rootView = (ViewGroup) inflater.inflate(R.layout.real_p, container,false );

        // 사진첩 선택시
        ViewGroup layout = rootView.findViewById(R.id.click_j1);
        layout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
//                activity.ClickPola();
            }
        });

        return rootView;
    }

    // 인터페이스
    public interface ClickPolaListener{
        public void ClickPola();
    }
}
